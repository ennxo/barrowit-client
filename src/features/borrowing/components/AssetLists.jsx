import { Link, useSearchParams } from "react-router-dom"
import { useCart, useFetch, useFilter } from "../../../hooks"
import { getClientAssets } from "../api"
import { cn } from "../../../utils"
import { useState } from "react"
import { Pagination } from "./Pagination"
import { Notification } from "../../../components/Overlays"
import { XCircleIcon } from "@heroicons/react/24/outline"

const filterList = (array, categories, recommendations, query) => {
  return array.reduce((filteredArray, asset) => {
    if (query && !asset.name.toLowerCase().includes(query.toLowerCase())) {
      return filteredArray
    }
    if (categories.length > 0 && !categories.includes(asset.Category.title)) {
      return filteredArray
    }
    if (recommendations.length > 0 && !recommendations.includes(asset.name)) {
      return filteredArray
    }
    return [...filteredArray, asset]
  }, [])
}

export const AssetLists = () => {
  const { checkedCategories, sortType, checkedRecommendations, query } = useFilter()
  const { addCarts, cartNotification,setCartNotification } = useCart()
  const { data: initialAssets, hasPending } = useFetch(getClientAssets)
  const filteredAssets = filterList(initialAssets, checkedCategories, checkedRecommendations, query)
  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = parseInt(searchParams.get("page"))
  const [currentPage, setCurrentPage] = useState(queryPage || 1)
  const recordsPerPage = 16
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const npage = Math.ceil(filteredAssets.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const assets = filteredAssets.slice(firstIndex, lastIndex)

  switch (sortType) {
    case "Ascending":
      initialAssets.sort((a, b) => a.total_quantity - b.total_quantity)
      break
    case "Descending":
      initialAssets.sort((a, b) => b.total_quantity - a.total_quantity)
      break
    case "A-Z":
      initialAssets.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "Z-A":
      initialAssets.sort((a, b) => b.name.localeCompare(a.name))
      break
    default:
      break
  }

  const addToCart = async (data) => {
    setCartNotification(true)
    addCarts(data, 1)
  }
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">No Assets Found</h2>
        {!hasPending && assets.length <= 0 && (
          <div className="font-medium text-xl flex flex-col justify-center items-center w-full pt-20">
            <XCircleIcon className="h-10 text-red-600"/>
            <h3>
              There are no assets found.
            </h3>
          </div>
        )}
        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {assets?.map((asset) => (
            <div
              key={asset.id}
              className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
            >
              <div
                className={cn(
                  "aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-300 group-hover:opacity-75 h-60",
                  { "opacity-50": !asset.total_quantity }
                )}
              >
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="h-full w-full object-scale-down object-center"
                />
              </div>
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link
                    to={`/asset/${asset.id}`}
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {asset.name}
                  </Link>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <p className="sr-only">{asset.Category.title} category</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {asset.Category.title}
                  </p>
                </div>
                <p className="mt-4 text-base font-thin text-gray-900">
                  {!!asset.total_quantity
                    ? `In Stock (${asset.total_quantity})`
                    : <span className="text-white p-1 bg-gray-600 rounded-md font-semibold text-sm">Out of Stock</span>}
                </p>
                {asset.total_quantity > 0 && (  
                <Link
                  onClick={() => addToCart(asset)}
                  className="relative flex mt-2 items-center justify-center rounded-md border border-transparent bg-orange-600 py-2 px-8 text-sm font-medium text-orange-200 hover:bg-orange-700 hover:text-white"
                >
                  Add Asset
                </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <Pagination 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      npage={npage}
      firstIndex={firstIndex}
      numbers={numbers} />
      <Notification show={cartNotification} setShow={setCartNotification} title={"Successfully added!"} subtitle={"Click the cart to view assets"}/>
    </div>
  )
}
