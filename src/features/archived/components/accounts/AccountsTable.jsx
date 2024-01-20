import { useFetch } from "../../../../hooks"
import { getArchivedAccounts } from "../../api"
import { useState } from "react"
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid"
import { RestoreModal } from "./RestoreModal"
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"
import { EmptyData } from "../../../../components/Empty"

export const AccountsTable = () => {
  const { data: accounts, fetchData, hasPending } = useFetch(getArchivedAccounts)
  const [restoreModal, setRestoreModal] = useState(false)
  //Checkbox
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedAll, setSelectedAll] = useState(false)

  const handleSelectAll = () => {
    setSelectedAll((prev) => !prev)
    setSelectedItems(
      selectedAll ? [] : accounts.map((account) => account.user_id)
    )
  }

  const handleCheckboxChange = (accountId) => {
    setSelectedItems((prevSelectedItems) => {
      return prevSelectedItems.includes(accountId)
        ? prevSelectedItems.filter((account) => account !== accountId)
        : [...prevSelectedItems, accountId]
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Deactivated Accounts</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the deactivated users including their name,
            address, email and role.
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
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      <input
                        id="accounts"
                        aria-describedby="accounts"
                        name="accounts"
                        type="checkbox"
                        checked={selectedAll}
                        onChange={handleSelectAll}
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="flex justify-end relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      {selectedItems.length >= 1 && (
                        <ArchiveBoxXMarkIcon className="text-blue-700 h-5" onClick={() => setRestoreModal(prev => !prev)} />
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {accounts?.map((account) => (
                    <tr key={account.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <input
                            id={account.first_name}
                            aria-describedby={account.last_name}
                            name={account.first_name}
                            type="checkbox"
                            checked={selectedItems.includes(account.user_id)}
                            onChange={() =>
                              handleCheckboxChange(account.user_id)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={account.avatar}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{`${
                              account.first_name
                            } ${account.middle_name || ""} ${
                              account.last_name
                            }`}</div>
                            <div className="text-gray-500">
                              {account.User.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-500">{account.address}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                          Deactivated
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {account.User.roles.toUpperCase()}
                      </td>
                      <td className="flex justify-center relative whitespace-nowrap py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-5">
                        <Link to={`view/${account.id}`} className="text-gray-600 hover:text-gray-900">
                            <DocumentMagnifyingGlassIcon className="h-5"/>
                        </Link>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <EmptyData array={accounts} message={"No deactivated accounts found"} hasPending={hasPending} />
            </div>
          </div>
        </div>
      </div>
      <RestoreModal open={restoreModal} setOpen={setRestoreModal} fetchData={fetchData} accountId={selectedItems} reset={setSelectedItems}/>
    </div>
  )
}
