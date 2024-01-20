import React, { Fragment } from "react"


export const CompletedPrintTemplate = React.forwardRef(({reservations, account} ,ref) => {
  const fullName = account?.first_name + " " + account?.last_name
    return ( 
      <div className="hidden">
      <div ref={ref} className="px-8 pt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Completed Request of Assets</h1>
          <h1 className="text-xl font-semibold text-gray-900">{fullName}</h1>
          <p className="mt-2 text-sm text-gray-700">
           {account?.address}
          </p>
        </div>
      </div>
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Quantity
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {reservations?.map((request) => (
                    <Fragment key={request.id}>
                    <tr className="pagebreak"></tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-md" src={request.Asset?.image} alt="asset-image" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{request.Asset?.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {request.quantity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(request.return_date).toLocaleString()}
                      </td>
                    </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
    </div>
    </div>
     )
})