import { Link, useSearchParams } from "react-router-dom"
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
       <nav
       aria-label="Pagination"
       className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
     >
       <div className="min-w-0 flex-1">
         <Link
           onClick={previousPage}
           className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
         >
           Previous
         </Link>
       </div>
       <div className="hidden space-x-2 sm:flex">
         {/* Current: "border-indigo-600 ring-1 ring-indigo-600", Default: "border-gray-300" */}
         {numbers.map((n, i) => (
         <Link
           key={i}
           to={`?${new URLSearchParams({page: n.toString()})}`}
           onClick={() => changePage(n)}
           className={cn("inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600", { "border-indigo-600 ring-1 ring-indigo-600": currentPage === n })}
         >
           {n}
         </Link>
         ))}
       </div>
       <div className="flex min-w-0 flex-1 justify-end">
         <Link
           onClick={nextPage}
           className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
         >
           Next
         </Link>
       </div>
     </nav>
     )
}