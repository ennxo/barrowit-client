import { useFetch } from "../../../../hooks"
import { useRef } from "react"
import { PrinterIcon } from "@heroicons/react/24/solid"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { getRequest } from "../../api"
import { useReactToPrint } from "react-to-print"
import { CompletedPrintTemplate } from "./CompletedPrintTemplate"
import {
  DocumentMagnifyingGlassIcon,
  FlagIcon,
} from "@heroicons/react/24/solid"
import { ReportModal } from "./ReportModal"
import { useState } from "react"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline"

export const CompletedDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const printRef = useRef()
  const { data: account, error } = useFetch(getRequest(id, "completed"))
  const [reportModal, setReportModal] = useState(false)
  const [request, setRequest] = useState([])
  const reservations = account?.ProfileAssets

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Completed Assets",
  })

  const report = (request) => {
    setReportModal(prev => !prev)
    setRequest(request)
  }

  return error.status ? (
    <Navigate to="/reservations" />
  ) : (
    <div className="px-4 sm:px-6 lg:px-8 pt-10">
      <CompletedPrintTemplate
        ref={printRef}
        reservations={reservations}
        account={account}
      />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <button onClick={() => navigate(-1)} className="mr-2 flex-shrink-3"><ArrowUturnLeftIcon className='h-5'/></button>
          <h1 className="text-xl font-semibold text-gray-900 flex">
            {account?.full_name}
            <Link
              to={`/reservations/view/${account.id}`}
              className="flex items-center pl-2 pt-1"
            >
              <DocumentMagnifyingGlassIcon className="h-5" />
            </Link>
          </h1>
          <p className="mt-2 text-sm text-gray-700">{account?.address}</p>
        </div>
      </div>
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
              Return Date
            </th>
            <th
              scope="col"
              className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Purpose
            </th>
            <th
              scope="col"
              className="flex justify-end relative py-3.5 pl-3 pr-4 sm:pr-6"
            >
              {reservations?.length > 0 && (
              <Link onClick={handlePrint}>
                <PrinterIcon className="text-gray-900 h-6" />
              </Link>
              )}
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
                {new Date(request.return_date).toLocaleString()}
              </td>
              <td className="hidden lg:table-cell px-3 py-4 text-sm text-gray-500 w-60 break-normal">
                <div className="text-gray-700">
                  {request.purpose}
                </div>
              </td>
              <td className="whitespace-nowrap py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-5">
              <div className="flex justify-center items-center space-x-5">
                <Link to={`/assets/view/${request.asset_id}`} className="text-grey-600 hover:text-grey-900">
                    <DocumentMagnifyingGlassIcon className="h-5" />
                  </Link>
                  <Link className="text-red-600 hover:text-red-900" onClick={() => report(request)}>
                    <FlagIcon className="h-5" />
                </Link>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReportModal open={reportModal} setOpen={setReportModal} request={request} />
    </div>
  )
}
