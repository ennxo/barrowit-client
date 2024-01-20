import { useState } from "react"
import { AddModal, UpdateModal, DeleteModal, ViewModal } from "../components"
import { useAuth, useFetch, usePermission } from "../../../hooks"
import { getCategories } from "../api"
import { Link, useSearchParams } from "react-router-dom"
import { DocumentMagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Pagination } from "../../../components/Navigations"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { EmptyData } from "../../../components/Empty"

export const Categories = () => {
  const { hasPermission } = usePermission()
  const [addModal, setAddModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const { data, fetchData, hasPending } = useFetch(getCategories)
  const [category, setCategory] = useState([])
  //Pagination
  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = parseInt(searchParams.get("page"))
  const [currentPage, setCurrentPage] = useState(queryPage || 1)
  const recordsPerPage = 10
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const npage = Math.ceil(data.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const categories = data.slice(firstIndex, lastIndex)
  //Checkbox
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)

  const onEdit = (data) => {
    setCategory(data)
    setUpdateModal((prev) => !prev)
  }

  const onView = (data) => {
    setCategory(data)
    setViewModal((prev) => !prev)
  }

  const handleSelectAll = () => {
    setSelectedAll((prev) => !prev)
    setSelectedItems(
      selectedAll ? [] : categories.map((category) => category.id)
    )
  }

  const handleCheckboxChange = (categoryId) => {
    setSelectedItems((prevSelectedItems) => {
      return prevSelectedItems.includes(categoryId)
        ? prevSelectedItems.filter((category) => category !== categoryId)
        : [...prevSelectedItems, categoryId]
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the asset's categories.
          </p>
        </div>
        {hasPermission("user.edit") && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setAddModal((prev) => !prev)}
            >
              <PlusCircleIcon className="h-5 mr-2" />
              Add category
            </button>
          </div>
        )}
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {hasPermission("user.edit") && (
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  <input
                    id="categories"
                    aria-describedby="categories"
                    name="categories"
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
              {hasPermission("user.edit") && (
                <th
                  scope="col"
                  className="flex justify-end relative py-3.5 pl-3 pr-4 sm:pr-6"
                >
                  {selectedItems.length >= 1 && (
                    <TrashIcon
                      className="text-red-700 h-5"
                      onClick={() => setDeleteModal((prev) => !prev)}
                    />
                  )}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {categories.map((category) => (
              <tr key={category.id}>
                {hasPermission("user.edit") && (
                  <td className="max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    <input
                      id={category.title}
                      aria-describedby={category.description}
                      name={category.title}
                      type="checkbox"
                      checked={selectedItems.includes(category.id)}
                      onChange={() => handleCheckboxChange(category.id)}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </td>
                )}
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {category.title}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {category.description}
                </td>
                <td className="flex justify-end py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-3">
                  {hasPermission("user.read") && (
                    <Link
                      onClick={() => onView(category)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <DocumentMagnifyingGlassIcon className="h-5" />
                    </Link>
                  )}
                  {hasPermission("user.edit") && (
                    <Link
                      className="text-green-600 hover:text-green-900"
                      onClick={() => onEdit(category)}
                    >
                      <PencilIcon className="h-5" />
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EmptyData array={categories} message={"No categories found"} hasPending={hasPending} />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        npage={npage}
        firstIndex={firstIndex}
        numbers={numbers}
      />
      <AddModal open={addModal} setOpen={setAddModal} fetchData={fetchData} />
      {category && (
        <UpdateModal
          open={updateModal}
          setOpen={setUpdateModal}
          fetchData={fetchData}
          category={category}
        />
      )}
      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        fetchData={fetchData}
        categoryId={selectedItems}
        reset={setSelectedItems}
      />
      <ViewModal open={viewModal} setOpen={setViewModal} category={category} />
    </div>
  )
}
