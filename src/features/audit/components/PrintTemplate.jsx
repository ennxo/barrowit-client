import React, { Fragment } from "react"

export const PrintTemplate = React.forwardRef(({audits}, ref) => {
  return (
    <div className="hidden">
      <div ref={ref} className="px-4 sm:px-6 lg:px-8 pt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Audit Trail</h1>
            <p className="mt-2 text-sm text-gray-700">
              A sequential records of all database operations
            </p>
          </div>
        </div>
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
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Action
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
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
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {audits.map((audit) => (
                <Fragment key={audit.id}>
                  <tr>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      {audit.actor}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {audit.action}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {audit.table}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 break-normal">
                      <div className="text-gray-500">{audit.description}</div>
                    </td>
                    <td className=" px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {new Date(audit.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {new Date(audit.updatedAt).toLocaleString()}
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
