import { Link, useParams } from "react-router-dom"
import { useFetch } from "../../../hooks"
import { getRelatedAssets } from "../api"

export const RelatedLists = ({title}) => {
  const { id } = useParams()
  const { data: assets } = useFetch(getRelatedAssets(id))
  return (
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-700">{title}</h2>
          <Link to="/browse" className="hidden text-sm font-medium text-orange-600 hover:text-orange-500 md:block">
            Browse more
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-8 -mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <div key={asset.id} className="group relative border-r border-b border-t border-gray-200 p-4 sm:p-6">
              <div className="h-60 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="h-full w-full object-scale-down object-center"
                />
              </div>
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link reloadDocument to={`/asset/${asset.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {asset.name}
                  </Link>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <p className="mt-1 text-sm text-gray-500">{asset.Category?.title}</p>
                </div>
                <p className="mt-4 text-base font-thin text-gray-900">
                  {asset.total_quantity
                    ? `In Stock (${asset.total_quantity})`
                    : `Out of Stock`}
                </p>
                {asset.total_quantity > 0 && (  
                <Link
                  onClick={() => addToCart(asset)}
                  className="relative flex mt-2 items-center justify-center rounded-md border border-transparent bg-orange-500 py-2 px-8 text-sm font-medium text-gray-100 hover:bg-orange-600 hover:text-white"
                >
                  Add Asset
                </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
