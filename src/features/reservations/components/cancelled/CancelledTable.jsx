import { Link } from "react-router-dom"
import { useFetch } from "../../../../hooks"
import { getRequests } from "../../api"
import { Layout } from "../Layout"
import { EmptyData } from "../../../../components/Empty"

export const CancelledTable = () => {
  const { data: accounts, hasPending } = useFetch(getRequests("cancelled"))

    return ( 
      <Layout title="Cancelled Requests" description="Asset's cancelled request.">
        <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Address
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {accounts?.map((account) => (
                      <tr key={account.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={`https://api.dicebear.com/7.x/initials/svg?seed=${account.first_name + " " + account.last_name}`} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{account.first_name + " " + account.middle_name + " " + account.last_name}</div>
                              <div className="text-gray-500">{account.User.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-500">{account.address}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                            Cancelled
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-5">
                          <Link to={`details/${account.id}`} className="text-blue-600 hover:text-blue-900">
                            View<span className="sr-only">, {account.last_name}</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
            </tbody>
        </table>
        <EmptyData array={accounts} message={"No cancelled requests found"} hasPending={hasPending} />
      </Layout>  
     )
}