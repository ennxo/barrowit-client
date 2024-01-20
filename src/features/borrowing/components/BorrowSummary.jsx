import { Link } from "react-router-dom"
import { useCart } from "../../../hooks"

export const BorrowSummary = () => {
  const { carts } = useCart()
  const total = carts.reduce((n, { total_quantity }) => n + total_quantity , 0)
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-orange-600">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl text-green-900">Processing</p>
          <p className="mt-2 text-base text-gray-500">Please be patient. Your borrowing assets are waiting for approval.</p>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your request</h2>

          <h3 className="sr-only">Assets</h3>
          {carts?.map((cart) => (
            <div key={cart.id} className="flex space-x-6 border-b border-gray-200 py-10">
              <img
                src={cart.image}
                alt={cart.name}
                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
              />
              <div className="flex flex-auto flex-col">
                <div>
                  <h4 className="font-medium text-gray-900 hover:text-green-600">
                    <Link to={`/asset/${cart.id}`}>{cart.name}</Link>
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">{cart.description}</p>
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Category</dt>
                      <dd className="ml-2 text-gray-700">{cart.Category.title}</dd>
                    </div>
                    <div className="flex pl-4 sm:pl-6">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{cart.total_quantity}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total Quantity</dt>
                <dd className="text-gray-900">{total}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
