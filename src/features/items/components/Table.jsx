import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../../../hooks"
import { getItems } from "../api"
import { getAsset } from "../../assets/api"
import { EmptyData } from "../../../components/Empty"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline"

export const Table = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: items } = useFetch(getItems(id)) 
    const { data: asset, hasPending } = useFetch(getAsset(id))

    const handleSelectAll = () => {
      setSelectedAll(prev => !prev)
      setSelectedItems(selectedAll ? [] : items.map(item => item.id))
    }
    
    const handleCheckboxChange = (itemId) => {
      setSelectedItems((prevSelectedItems) => {
        return prevSelectedItems.includes(itemId)
          ? prevSelectedItems.filter((item) => item !== itemId)
          : [...prevSelectedItems, itemId]
      })
    }

    return (
      <div className="px-4 sm:px-6 lg:px-8 pt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
          <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-2 flex-shrink-3"><ArrowUturnLeftIcon className='h-5'/></button>
            <div className="flex-shrink-1">
              <img
                className="h-12 w-12 rounded-xl"
                src={asset.image}
                alt=""
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{asset.name}</h3>
              <p className="text-sm text-gray-500">
                {`${asset.name}'s Items`}
              </p>
            </div>
          </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-5">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => navigate('add')}
            >
              Add Item
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Brand
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Model
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Date of Purchase (YYYY)
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Cost
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Total Cost
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Depreciation
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Scrap Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {item.name}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Brand</dt>
                      <dd className="mt-1 truncate text-gray-700">{"Hello" + item.brand}</dd>
                      <dt className="sr-only sm:hidden">Model</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">{item.model}</dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.brand}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{item.model}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{new Date(item.date_of_purchase).getFullYear()}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{item.quantity}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">₱{item.cost}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">₱{item.total_cost}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">₱-{item.depreciation}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">₱{item.scrap_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <EmptyData array={items} message="No items found." hasPending={hasPending} />
        </div>
      </div>
    )
  }
  