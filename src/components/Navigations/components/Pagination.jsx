import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { cn } from "../../../utils"

export const Pagination = ({currentPage, setCurrentPage, npage, firstIndex, numbers}) => {
  const changePage = (id) => {
    setCurrentPage(id)
  }

  const nextPage = () => {
    currentPage !== npage && setCurrentPage(currentPage + 1)
  }

  const previousPage = () => {
    firstIndex !== 0 && setCurrentPage(currentPage - 1)
  }
    return npage > 1 && ( 
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <Link
          onClick={previousPage}
          className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {numbers.map((n, i) => (
        <Link
          key={i}
          to={`?${new URLSearchParams({page: n.toString()})}`}
          onClick={() => changePage(n)}
          className={cn("inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700", { "border-green-500 text-green-600": currentPage === n })}
        >
          {n}
        </Link>
        ))}
        {/* Current: "border-green-500 text-green-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Link
          onClick={nextPage}
          className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Link>
      </div>
    </nav>
     )
}