import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../../../../hooks"
import { getRequest } from "../../api"
import { useState } from "react"
import { CompleteModal } from "../completed"
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline"


const filterDate = (array, status) => {
  const currentDate = new Date()
  switch (status) {
    case "current":
      return array?.filter((b) => {
        const returnDate = new Date(b.return_date)
        return returnDate.toDateString() !== currentDate.toDateString() && returnDate.getTime() > currentDate.getTime()
      })
    case "returning":
      return array?.filter((b) => {
        const returnDate = new Date(b.return_date)
        return returnDate.toDateString() === currentDate.toDateString()
      })
    case "overdue":
      return array?.filter((b) => {
        const returnDate = new Date(b.return_date)
        return returnDate.toDateString() !== currentDate.toDateString() && returnDate.getTime() < currentDate.getTime()
      })
    default:
      return array
  }
}

export const ApprovedDetails = () => {
  const { id, status } = useParams()
  const navigate = useNavigate()
  const [completeModal, setCompleteModal] = useState(false)
  const { data: account, error } = useFetch(getRequest(id, "approved"))
  const reservations = filterDate(account?.ProfileAssets, status)
  const transactionIds = reservations?.map(r => r.id)

  return error.status ? (
    <Navigate to="/reservations" />
  ) : (
    <div className="px-4 sm:px-6 lg:px-8 pt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <button onClick={() => navigate(-1)} className="mr-2 flex-shrink-3"><ArrowUturnLeftIcon className='h-5'/></button>
        <h1 className="text-xl font-semibold text-gray-900 flex">{account?.full_name}
          <Link to={`/reservations/view/${account.id}`} className="flex items-center pl-2 pt-1">
            <DocumentMagnifyingGlassIcon className="h-5"/>
          </Link>
          </h1>
          <p className="mt-2 text-sm text-gray-700">{account?.address}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-5">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setCompleteModal((prev) => !prev)}
          >
            Complete Request
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
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Borrowed Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Return Date
                    </th>
                    <th
                      scope="col"
                      className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {reservations?.map((request) => (
                    <tr key={request.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md"
                              src={request.Asset?.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {request.Asset?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-3 py-4 text-sm text-gray-500 w-60 break-normal">
                        <div className="text-gray-700">
                          {request.Asset?.description}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {request.quantity}
                      </td>
                      <td className="break-normal px-3 py-4 text-sm text-gray-500">
                        {new Date(request.borrow_date).toLocaleString()}
                      </td>
                      <td className="break-normal px-3 py-4 text-sm text-gray-500">
                        {new Date(request.return_date).toLocaleString()}
                      </td>
                      <td className="hidden lg:table-cell px-3 py-4 text-sm text-gray-500 w-60 break-normal">
                        <div className="text-gray-700">
                          {request.purpose}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CompleteModal
        open={completeModal}
        setOpen={setCompleteModal}
        account={account}
        transactionIds={transactionIds}
        navigate={navigate}
      />
    </div>
  )
}
