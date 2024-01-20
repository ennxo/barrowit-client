import { useRef, useState, useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { DocumentMagnifyingGlassIcon, PrinterIcon} from "@heroicons/react/24/solid"
import { useFetch } from "../../../hooks"
import { getAudits } from "../api"
import { Pagination } from "../../../components/Navigations"
import { useReactToPrint } from "react-to-print"
import { PrintTemplate } from "./PrintTemplate"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"
import { EmptyData } from "../../../components/Empty"

//Filter audits by month
const filterAudits = (array, selectedMonth) => {
  if(!selectedMonth) return array
  const month = selectedMonth.getMonth()
  const startDate = new Date(selectedMonth.getFullYear(), month, 1)
  const endDate = new Date(selectedMonth.getFullYear(), month + 1, 0)
  return array.filter((audit) => {
    const createdAt = new Date(audit.createdAt)
    return createdAt >= startDate && createdAt <= endDate
  })
}

export const Table = () => {
  const printRef = useRef()
  const { data, hasPending } = useFetch(getAudits)
  const [selectedMonth, setSelectedMonth] = useState()
  const filteredAudits = filterAudits(data, selectedMonth)
  //Pagination
  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = parseInt(searchParams.get("page"))
  const [currentPage, setCurrentPage] = useState(queryPage || 1)
  const recordsPerPage = 10
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const npage = Math.ceil(filteredAudits.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const audits = filteredAudits.slice(firstIndex, lastIndex)

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Audit Trails"
  })

  const onDateChange = (newDate) => {
    setSelectedMonth(newDate)
  }

  

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-10">
      <PrintTemplate ref={printRef} audits={audits}/>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Audit Trail</h1>
          <p className="mt-2 text-sm text-gray-700">
            A sequential records of all database operations
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
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Actor
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Action
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Table
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Description
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Created At
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Updated At
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
              <Link>
              <PrinterIcon className="hidden lg:table-cell text-gray-900 h-6" onClick={handlePrint} />
              </Link>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {audits.map((audit) => (
              <tr key={audit.id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {audit.actor}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {audit.action}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {audit.table}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 w-60 break-normal">
                  <div className="text-gray-500">{audit.description}</div>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {new Date(audit.createdAt).toLocaleString()}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {new Date(audit.updatedAt).toLocaleString()}
                </td>
                <td className="flex justify-end py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-3">
                  <Link
                    to={`view/${audit.id}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <DocumentMagnifyingGlassIcon className="h-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EmptyData array={audits} message={"No audit records found"} hasPending={hasPending} />
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} npage={npage} firstIndex={firstIndex} numbers={numbers}/>        
    </div>
  )
}
