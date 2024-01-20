import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { addEventAsset } from "../api"
import { useError, useFetch, usePermission } from '../../../hooks'
import { Error } from '../../../components/Misc'
import { TagIcon } from '@heroicons/react/24/solid'
import { Pagination } from '../../../components/Navigations'
import { EmptyData } from '../../../components/Empty'
import { useSearchParams } from 'react-router-dom'
import { getClientAssets } from '../../borrowing'


export const AddAssetModal = ({open, setOpen, fetchData, eventAssets, eventId}) => {
  const { hasPermission } = usePermission()
  const [error, setError] = useError()
  const cancelButtonRef = useRef(null)
  const { data: availableAssets, hasPending } = useFetch(getClientAssets)
  const filteredAssets = availableAssets.filter((asset) => !eventAssets.some((eventAsset) => eventAsset.id === asset.id))

  const { handleSubmit, reset } = useForm() 

  //Checkbox
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)

  //Pagination
  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = parseInt(searchParams.get("page"))
  const [currentPage, setCurrentPage] = useState(queryPage || 1)
  const recordsPerPage = 5
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const npage = Math.ceil(filteredAssets.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const assets = filteredAssets.slice(firstIndex, lastIndex)

  
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


  const onSubmit = async () => {
    try {
      await addEventAsset(eventId, selectedItems)
      fetchData() 
      setOpen(false)
      setError({})
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  const onCancel = () => {
    setOpen(false)
    setError({})
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:flex sm:items-start w-full">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TagIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 ">
                      Add Event Asset
                    </Dialog.Title>
                    <Error error={error.status} message={error.message} />
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
                    </tr>
                  ))}
                </tbody>
              </table>
              <EmptyData array={assets} message={"No available assets found"} hasPending={hasPending} />
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
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">=
                  {!assets.length <= 0 && (
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={onCancel}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
