import { useFetch } from "../../../../hooks"
import { Link } from "react-router-dom"
import { useState } from "react"
import { RestoreModal } from "./RestoreModal"
import { DocumentMagnifyingGlassIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid"
import { getArchivedAssets } from "../../api"
import { EmptyData } from "../../../../components/Empty"

export const AssetsTable = () => {
    const { data: assets, fetchData, hasPending } = useFetch(getArchivedAssets)
    const [restoreModal, setRestoreModal] = useState(false)
    //Checkbox
    const [selectedItems, setSelectedItems] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)

    const handleSelectAll = () => {
      setSelectedAll(prev => !prev)
      setSelectedItems(selectedAll ? [] : assets.map(asset => asset.id))
    }
    
    const handleCheckboxChange = (assetId) => {
      setSelectedItems((prevSelectedItems) => {
        return prevSelectedItems.includes(assetId)
          ? prevSelectedItems.filter((asset) => asset !== assetId)
          : [...prevSelectedItems, assetId];
      })
    }

    return (
      <div className="px-4 sm:px-6 lg:px-8 pt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Archived Assets</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the archived barangay assets (tangible) including available and in-stock assets.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
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
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Useful Lifespan
                      </th>
                      <th scope="col" className="flex justify-end relative py-6 mr-3 sm:pr-6">
                      {selectedItems.length >= 1 && <ArchiveBoxXMarkIcon className="text-blue-900 h-5" onClick={() => setRestoreModal(prev => !prev)}/>}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {assets.map((asset) => (
                      <tr key={asset.id}>
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
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-md" src={asset.image} alt={asset.name} />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{asset.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-700 overflow-hidden truncate w-60">{asset.description}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                            Archived
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.useful_lifespan}</td>
                        <td className="flex justify-center relative whitespace-nowrap py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-5">
                        <Link  to={`view/${asset.id}`} className="text-gray-600 hover:text-gray-900">
                            <DocumentMagnifyingGlassIcon className="h-5"/>
                        </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <EmptyData array={assets} message={"No archived assets found"} hasPending={hasPending} />
              </div>
            </div>
          </div>
        </div>
        <RestoreModal open={restoreModal} setOpen={setRestoreModal} fetchData={fetchData} assetsId={selectedItems} reset={setSelectedItems}/>
      </div>
    )
  }
  