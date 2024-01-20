import { Link, useSearchParams } from "react-router-dom"
import { useFetch } from "../../../hooks"
import { getReports } from "../api"
import {
  DocumentMagnifyingGlassIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid"
import { useRef, useMemo, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { ReportPrintTemplate } from "./ReportPrintTemplate"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"
import { Pagination } from "../../../components/Navigations"
import { EmptyData } from "../../../components/Empty"

//Filter reports by month
const filterReports = (array, selectedMonth) => {
  if (!selectedMonth) return array
  const month = selectedMonth.getMonth()
  const startDate = new Date(selectedMonth.getFullYear(), month, 1)
  const endDate = new Date(selectedMonth.getFullYear(), month + 1, 0)
  return array.filter((report) => {
    const dateIssued= new Date(report.date_issued)
    return dateIssued >= startDate && dateIssued <= endDate
  })
}

export const Table = () => {
  const { data, hasPending } = useFetch(getReports)
  const [selectedMonth, setSelectedMonth] = useState()
  const filteredReports = filterReports(data, selectedMonth)
  const printRef = useRef()
  //Pagination
  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = parseInt(searchParams.get("page"))
  const [currentPage, setCurrentPage] = useState(queryPage || 1)
  const recordsPerPage = 10
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const npage = Math.ceil(filteredReports.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const reports = filteredReports.slice(firstIndex, lastIndex)

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Damaged Assets",
  })

  const onDateChange = (newDate) => {
    setSelectedMonth(newDate)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-10">
      <ReportPrintTemplate ref={printRef} reports={reports} />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Damage Asset Reports
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the damaged assets that have been returned. 
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none md:flex lg:flex lg:space-x-6">
          <DatePicker
            selected={selectedMonth}
            onChange={onDateChange}
            showMonthYearPicker
            showIcon
            icon={<CalendarDaysIcon className="text-gray-900" />}
            dateFormat="MMMM"
            wrapperClassName="w-full"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
            placeholderText="Select a month"
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
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Asset Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="hidden lg:table-cell py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Resident Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Condition
                    </th>
                    <th
                      scope="col"
                      className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Remarks
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date Reported
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {reports.length > 0 && (
                        <Link>
                          <PrinterIcon
                            className="text-gray-900 h-6"
                            onClick={handlePrint}
                          />
                        </Link>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {reports?.map((report) => (
                    <tr key={report.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={report?.Asset?.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {report?.Asset?.name}
                            </div>
                            <div className="text-gray-500">
                              {report?.Asset?.Category?.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report.quantity}
                      </td>
                      <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {report?.Profile?.full_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                          Damaged
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-3 py-4 text-sm text-gray-500 w-50 break-normal">
                        <div className="text-gray-500">{report.remarks}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(report.date_issued).toLocaleString()}
                      </td>
                      <td className="flex justify-center relative whitespace-nowrap py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-5">
                        <Link
                          to={`view/${report.id}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <DocumentMagnifyingGlassIcon className="h-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <EmptyData array={reports} message={"No damaged assets found"} hasPending={hasPending} />
            </div>
          </div>
        </div>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} npage={npage} firstIndex={firstIndex} numbers={numbers}/>        
    </div>
  )
}
