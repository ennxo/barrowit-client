import { Link } from "react-router-dom"
import { useFetch } from "../../../hooks"
import { getRelatedAssets } from "../../borrowing"

const products = [
    {
      id: 1,
      name: 'Leather Long Wallet',
      color: 'Natural',
      price: '$75',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-asset-02.jpg',
      imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    // More products...
  ]
  
  export const RecommendList = () => {
    const { data: assets } = useFetch(getRelatedAssets())
    return (
        <div className="mx-auto max-w-2xl px-4 sm:py-1 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Barangay Assets</h2>
            <Link to='/browse' className="hidden text-sm font-medium text-orange-600 hover:text-orange-500 md:block">
              Browse all assets
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
  
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {assets.map((asset) => (
              <div key={asset.id} className="group relative">
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 group-hover:bg-green-100 lg:h-72 xl:h-80">
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="h-full w-full object-scale-down object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  <Link to={`/asset/${asset.id}`}>
                    <span className="absolute inset-0" />
                    {asset.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{asset.Category?.title}</p>
              </div>
            ))}
          </div>
  
          <div className="mt-8 text-sm md:hidden">
            <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
              Browse all assets
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
    )
  }
  