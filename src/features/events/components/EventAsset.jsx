import { useFetch, usePermission } from "../../../hooks"
import { getEvent, getEventAssets } from "../api"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useState } from "react"
import { DeleteAssetModal } from "./DeleteAssetModal"
import { AddAssetModal } from "./AddAssetModal"

import {
  DocumentMagnifyingGlassIcon,
  TrashIcon
} from "@heroicons/react/24/solid"
import { Pagination } from "../../../components/Navigations"
import { ArrowUturnLeftIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { EmptyData } from "../../../components/Empty/"

export const EventAsset = () => {
  const { hasPermission } = usePermission()
  const { id } = useParams()
  const navigate = useNavigate()
  const [addModal, setAddModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const { data: event } = useFetch(getEvent(id))
  const { data: eventAssets, fetchData, hasPending } = useFetch(getEventAssets(id))

  //Checkbox
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)

  //Pagination
  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = parseInt(searchParams.get("page"))
  const [currentPage, setCurrentPage] = useState(queryPage || 1)
  const recordsPerPage = 10
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const npage = Math.ceil(eventAssets.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const assets = eventAssets.slice(firstIndex, lastIndex)

  
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

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <button onClick={() => navigate(-1)} className="mr-2 flex-shrink-3"><ArrowUturnLeftIcon className='h-5'/></button>
          <h1 className="text-xl font-semibold text-gray-900">{event.title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {event.description}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none md:flex lg:flex lg:space-x-6">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setAddModal((prev) => !prev)}
          >
            <PlusCircleIcon className="h-5 mr-2" />
            Add assets
          </button>
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
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Total Quantity
                    </th>
                    <th
                      scope="col"
                      className="flex justify-end relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      {selectedItems.length >= 1 && (
                      <Link>
                          <TrashIcon
                            className="text-red-900 h-5"
                            onClick={() => setDeleteModal((prev) => !prev)}
                          />
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
                      <td className="px-3 py-4 text-sm text-center text-gray-500 lg:table-cell">
                        {asset.total_quantity}
                      </td>
                      <td className="whitespace-nowrap py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-5">
                      <div className="flex justify-end py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-3">
                        {hasPermission("user.read") && (
                        <Link
                          to={`/assets/view/${asset.id}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <DocumentMagnifyingGlassIcon className="h-5" />
                        </Link>
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
      <DeleteAssetModal
        open={deleteModal}
        setOpen={setDeleteModal}
        fetchData={fetchData}
        eventId={id}
        assetId={selectedItems}
        reset={setSelectedItems}
      />
      <AddAssetModal
        open={addModal}
        setOpen={setAddModal}
        fetchData={fetchData}
        eventAssets={eventAssets}
        eventId={id}
      />
    </div>
  )
}
