import { useFetch, usePermission } from "../../../hooks"
import { getAssets } from "../api"
import { cn } from "../../../utils"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useState } from "react"
import { DeleteModal } from "./DeleteModal"
import {
  PencilIcon,
  ListBulletIcon,
  PrinterIcon,
  DocumentMagnifyingGlassIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { PrintTemplate } from "./PrintTemplate"
import { Pagination } from "../../../components/Navigations"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import Select from "react-select"
import { categories } from "../data"
import { EmptyData } from "../../../components/Empty"

const filtered = (array, query, selectedCategory) => {
  return array.reduce((filteredArray, asset) => {
    if(!asset.status === false){
      return filteredArray
    }
    if(query && !asset.name.toLowerCase().includes(query.toLowerCase())){
      return filteredArray
    }
    if(selectedCategory.length > 0 && !selectedCategory.includes(asset.Category.title)){
      return filteredArray
    }
    return [...filteredArray, asset]
  }, [])
}

export const StockTable = () => {
  const { hasPermission } = usePermission()
  const printRef = useRef()
  const navigate = useNavigate()
  const [deleteModal, setDeleteModal] = useState(false)
  const { data, fetchData, hasPending } = useFetch(getAssets)
  const categoriesData = categories()
  //Search
  const [query, setQuery] = useState()
  //Category 
  const [selectedCategory, setSelectedCategory] = useState([])
  //Checkbox
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)
  //New Data
  const newData = filtered(data, query, selectedCategory)
  //Pagination
  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = parseInt(searchParams.get("page"))
  const [currentPage, setCurrentPage] = useState(queryPage || 1)
  const recordsPerPage = 10
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const npage = Math.ceil(newData.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const assets = newData.slice(firstIndex, lastIndex)

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Assets",
  })

  const handleSelectAll = () => {
    setSelectedAll((prev) => !prev)
    setSelectedItems(selectedAll ? [] : assets.map((asset) => asset.id))
  }

  const handleCheckboxChange = (assetId) => {
    setSelectedItems((prevSelectedItems) => {
      return prevSelectedItems.includes(assetId)
        ? prevSelectedItems.filter((asset) => asset !== assetId)
        : [...prevSelectedItems, assetId]
    })
  }

  const handleSearch = (e) => {
    const query = e.target.value
    if (e.key === "Enter") {
      e.preventDefault()
      setQuery(query)
    }
    e.target.value === "" && setQuery("")
  }

  const handleChange = (e) => {
    const categories = e.map((category) => category.label)
    setSelectedCategory(categories)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-10">
      <PrintTemplate
        ref={printRef}
        assets={assets}
        title={"Stock Asset's Records"}
        subtitle={"A records of all stock assets"}
      />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Stock Assets</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all stock assets
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none md:flex lg:flex lg:space-x-6">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => navigate("/assets/add")}
          >
            <PlusCircleIcon className="h-5 mr-2" />
            Add assets
          </button>
        </div>
      </div>
      <div className="mt-6 space-y-5 sm:justify-between sm:flex sm:items-center sm:space-y-0">
        <div>
          <Select
            isMulti
            name="colors"
            onChange={handleChange}
            options={categoriesData}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-green-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
            placeholder="Search"
            type="search"
            onKeyDown={handleSearch}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                  {hasPermission("user.edit") && (
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      <input
                        id="assets"
                        aria-describedby="assets"
                        name="assets"
                        type="checkbox"
                        checked={selectedAll}
                        onChange={handleSelectAll}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </th>
                  )}
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="hidden px-8 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Useful Lifespan
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Total Quantity
                    </th>
                    <th
                      scope="col"
                      className="flex justify-end relative py-6 mr-3 sm:pr-6"
                    >
                      {assets.length > 0 && (
                      <Link>
                        {selectedItems.length >= 1 ? (
                          <ArchiveBoxIcon
                            className="text-blue-900 h-6"
                            onClick={() => setDeleteModal((prev) => !prev)}
                          />
                        ) : (
                          <PrinterIcon
                            className="text-gray-900 h-6"
                            onClick={handlePrint}
                          />
                        )}
                      </Link>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {assets.map((asset) => (
                    <tr key={asset.id}>
                      {hasPermission("user.edit") && (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <input
                            id={asset.name}
                            aria-describedby={asset.description}
                            name={asset.name}
                            type="checkbox"
                            checked={selectedItems.includes(asset.id)}
                            onChange={() => handleCheckboxChange(asset.id)}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                        </div>
                      </td>
                      )} 
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md"
                              src={asset.image}
                              alt={asset.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {asset.name}
                            </div>
                            <div className="text-gray-500">
                              {asset.Category?.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 w-60 break-normal lg:table-cell">
                        <div className="text-gray-700">{asset.description}</div>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-center text-gray-500 lg:table-cell">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          In Stock
                        </span>
                      </td>
                      <td className="hidden px-3 py-4 text-center text-sm text-gray-500 lg:table-cell">
                        {asset.useful_lifespan}
                      </td>
                      <td className="hidden px-3 py-4 text-center text-sm text-gray-500 lg:table-cell">
                        {asset.total_quantity}
                      </td>
                      <td className="whitespace-nowrap py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-5">
                      <div className="flex justify-center items-center space-x-5">
                        {hasPermission("user.read") && (
                        <Link
                          to={`/assets/view/${asset.id}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <DocumentMagnifyingGlassIcon className="h-5" />
                        </Link>
                        )}
                        {hasPermission("user.edit") && (
                        <>
                          <Link
                            to={`/items/${asset.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <ListBulletIcon className="h-5" />
                          </Link>
                          <Link
                            to={`/assets/update/${asset.id}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            <PencilIcon className="h-5" />
                          </Link>
                        </>
                        )}
                       </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <EmptyData array={assets} message={"No assets found"} hasPending={hasPending} />
            </div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              npage={npage}
              numbers={numbers}
              firstIndex={firstIndex}
            />
          </div>
        </div>
      </div>
      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        fetchData={fetchData}
        assetId={selectedItems}
        reset={setSelectedItems}
      />
    </div>
  )
}
