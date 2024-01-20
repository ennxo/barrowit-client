import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useFetch } from "../../../hooks"
import { getAccounts } from "../api"
import { useState } from "react"
import { DeleteModal } from "./DeleteModal"
import { MagnifyingGlassIcon, PencilIcon, UserMinusIcon } from "@heroicons/react/24/solid"
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { Pagination } from "../../../components/Navigations"
import { cn } from "../../../utils"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { usePermission } from "../../../hooks"
import { adminRoles } from "../../../data"
import { EmptyData } from "../../../components/Empty"
  
  const filtered = (array, query) => {
    const newArray = array.filter(account => adminRoles.includes(account.User.roles)) 
    if(query) {
      return newArray.filter((item) => item.full_name.toLowerCase().includes(query.toLowerCase()))
    } 
    return newArray
  }

export const AdminTable = () => {
    const { hasPermission } = usePermission()
    const navigate = useNavigate()
    const { data, fetchData, hasPending } = useFetch(getAccounts)
    const [deleteModal, setDeleteModal] = useState(false)
    //Search 
    const [query, setQuery] = useState()
    const users = filtered(data, query)
    //Pagination
    const [searchParams, setSearchParams] = useSearchParams()
    const queryPage = parseInt(searchParams.get("page"))
    const [currentPage, setCurrentPage] = useState(queryPage || 1)
    const recordsPerPage = 10
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const npage = Math.ceil(users.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const accounts = users.slice(firstIndex, lastIndex)
    //Checkbox
    const [selectedItems, setSelectedItems] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)

    const handleSelectAll = () => {
      setSelectedAll(prev => !prev)
      setSelectedItems(selectedAll ? [] : accounts.map(account => account.user_id))
    }
    
    const handleCheckboxChange = (accountId) => {
      setSelectedItems((prevSelectedItems) => {
        return prevSelectedItems.includes(accountId)
          ? prevSelectedItems.filter((account) => account !== accountId)
          : [...prevSelectedItems, accountId];
      })
    }

    const handleSearch = (e) => {
      const query = e.target.value
      if(e.key === 'Enter') {
        e.preventDefault()
        setQuery(query)
      }
      e.target.value === '' && setQuery('')
    }

    return (
      <div className="px-4 sm:px-6 lg:px-8 pt-10">
       <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Admin's Accounts</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the administrator account.
            </p>
          </div> 
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none md:flex lg:flex lg:space-x-6">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => navigate("add")}
            >
              <PlusCircleIcon className="h-5 mr-2"/>
              Add user
            </button>
          </div>
        </div>
        <div className="mt-6 space-y-5 sm:justify-end sm:flex sm:items-center sm:space-y-0">
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
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
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
                      )}
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Address
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th scope="col" className="flex justify-end relative py-3.5 pl-3 pr-4 sm:pr-6">
                        {selectedItems.length >= 1 && <UserMinusIcon className="text-red-700 h-5" onClick={() => setDeleteModal(prev => !prev)}/>}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {accounts?.map((account) => (
                      <tr key={account.id}>
                        {hasPermission("user.edit") && (
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                        <input
                              id={account.first_name}
                              aria-describedby={account.last_name}
                              name={account.first_name}
                              type="checkbox"
                              checked={selectedItems.includes(account.user_id)}
                              onChange={() => handleCheckboxChange(account.user_id)}
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                        </div>
                        </td>
                        )}
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={account.avatar} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{account.full_name}</div>
                              <div className="text-gray-500">{account.User.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-3 py-4 text-sm text-gray-500 w-70 break-normal">
                          <div className="text-gray-500">{account.address}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={cn("inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800", {"bg-red-100 text-red-800": account.User.roles === "admin"})}>
                          {account.User.roles.toUpperCase()}
                        </span>
                        </td>
                        <td className="whitespace-nowrap py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-5">
                        <div className="flex justify-center items-center space-x-5">
                          {hasPermission("user.read") && (
                          <Link  to={`${account.id}`} className="text-gray-600 hover:text-gray-900">
                              <DocumentMagnifyingGlassIcon className="h-5"/>
                          </Link>
                          )}
                          {hasPermission("user.edit") && (
                            <Link to={`update/${account.id}`} className="text-green-600 hover:text-green-900">
                              <PencilIcon className="h-5"/>
                            </Link>
                          )}
                        </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <EmptyData array={accounts} message={"No admin's accounts found"} hasPending={hasPending} />
              </div>
            </div>
          </div>
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} npage={npage} firstIndex={firstIndex} numbers={numbers} />
        <DeleteModal open={deleteModal} setOpen={setDeleteModal} fetchData={fetchData} accountId={selectedItems} reset={setSelectedItems} />
      </div>
    )
  }
  