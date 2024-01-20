import { CheckCircleIcon, ClockIcon, HandThumbUpIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useAuth, useFetch } from '../../../hooks'
import { getReservation } from '../api'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { BackToTop } from '../../../components/Navigations'

export const BorrowHistory = () => {
  const { auth } = useAuth()
  const { data: profile, hasPending } = useFetch(getReservation(auth?.profile?.id))
  const { ProfileAssets } = profile
  return (
    <>
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Borrow history</h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent borrow request.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent requests</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {!hasPending && ProfileAssets.length <= 0 && (
                <div className="flex flex-col justify-center items-center h-full py-20">
                <img src="/images/empty_history.svg" alt="empty history" className="h-40"/>
                <p className="text-gray-400 text-xl">No borrow history found</p>
              </div>  
              )}
              {ProfileAssets?.sort((a, b) => {return new Date(b.borrow_date) - new Date(a.borrow_date)}).map((reserve) => (
                <div
                  key={reserve.id}
                  className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <h3 className="sr-only">
                    Borrow placed on <time>{reserve.createdDate}</time>
                  </h3>

                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">

                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">Date placed</dt>
                        <dd className="mt-1 text-gray-500">
                          <time>{format(new Date(reserve.borrow_date), `EEEE, MMMM d, yyyy h:mm:ss a`)}</time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="mt-1 font-medium text-gray-900">{reserve.quantity}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  <ul role="list" className="divide-y divide-gray-200">
                      <li className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                            <img
                              src={reserve?.Asset?.image}
                              alt={reserve?.Asset?.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-6 flex-1 text-sm">
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>{reserve?.Asset?.name}</h5>
                            </div>
                            <p className="hidden text-gray-500 sm:mt-2 sm:block">{reserve?.Asset?.description}</p>
                          </div>
                        </div>

                        <div className="mt-6 sm:flex sm:justify-between">
                          <div className="flex items-center">
                            {reserve.status === "pending" && <ClockIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />}
                            {reserve.status === "approved" && <HandThumbUpIcon className="h-5 w-5 text-green-500" aria-hidden="true" />}
                            {reserve.status === "cancelled" && <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
                            {reserve.status === "completed" && <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />}
                            <p className="ml-2 text-sm font-medium text-gray-500">
                              {reserve.status.toUpperCase()}
                            </p>
                          </div>

                          <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                            <div className="flex flex-1 justify-center">
                              <Link
                                to={`/asset/${reserve?.Asset?.id}`}
                                className="whitespace-nowrap text-orange-600 hover:text-orange-500"
                              >
                                View product
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <BackToTop />
    </>
  )
}
