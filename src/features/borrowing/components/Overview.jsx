import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid"
import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../../../hooks/useFetch"
import { getOneClientAsset } from "../api"
import { useCart } from "../../../hooks"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputField } from "../../../components/Forms"
import { quantityValidation } from "../validations"
import { Notification } from "../../../components/Overlays"
import { RelatedLists } from "./RelatedLists"
import { XCircleIcon } from "@heroicons/react/24/outline"

export const Overview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: asset } = useFetch(getOneClientAsset(id))
  const { addCarts, cartNotification, setCartNotification } = useCart()
  const [quantity, setQuantity] = useState(1)
  const { register, trigger, formState: { errors }} = useForm({ resolver: yupResolver(quantityValidation(asset)) })

  const addToCart = async (data) => {
    const hasValid = await trigger()
    if(!hasValid) return;
    setCartNotification(true)
    addCarts(data, quantity)
  }

  const borrowNow = async (data) => {
    const hasValid = await trigger()
    if(!hasValid) return;
    addCarts(data, 1)
    navigate(`/asset/reserve`)
  }

  return (
    asset && (
<>
  <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
    {/* Product details */}
    <div className="lg:max-w-lg lg:self-end">
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {asset.name}
        </h1>
      </div>

      <section aria-labelledby="information-heading" className="mt-4">
        <h2 id="information-heading" className="sr-only">
          Asset information
        </h2>

        <div className="flex items-center text-gray-900 text-lg sm:text-xl">
          <p>
            In Stock: {asset.total_quantity}
          </p>
          <div className="ml-4 border-l border-gray-300 pl-4">
            <h2 className="sr-only">Category</h2>
            <div className="flex items-center text-sm text-gray-500">
              {asset?.Category?.title}
            </div>
          </div>
        </div>

        <div className="mt-4 text-base text-gray-500">
          {asset.description}
        </div>

        <div className="mt-6 flex items-center text-sm text-gray-500">
          {!!asset.total_quantity ? 
          (<>
          <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
          <p className="ml-2">Available and ready to be reserved</p>
          </>) : 
          (<>
          <XCircleIcon className="h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
          <p className="ml-2">Sorry, this asset is currently out of stock</p>
          </>)
          }
        </div>
      </section>
    </div>

    {/* Product image */}
    <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200">
        <img src={asset.image} alt={asset.name} className="h-full w-full object-cover object-center" />
      </div>
    </div>

    {/* Product form */}
    {!!asset.total_quantity && (
      <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
      <section aria-labelledby="options-heading">
      <div className="flex items-center">
            {/* <button
              className="bg-gray-200 p-2 rounded-sm"
              onClick={() => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1))}
            >
              <MinusIcon className="h-5 w-5 text-gray-500" />
            </button> */}
            <div className="py-1">
            <InputField
            name="quantity"
            label="Quantity"
            type="number"
            errors={errors}
            register={register}
            placeholder="0"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            />
            </div>
            {/* <button
              className="bg-gray-200 p-2 rounded-sm"
              onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}
            >
              <PlusIcon className="h-5 w-5 text-gray-500" />
            </button> */}
          </div>
        <div className="flex space-x-5">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 py-3 px-8 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            onClick={() => borrowNow(asset)}
          >
            Borrow Now
          </button>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 py-3 px-8 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            onClick={() => addToCart(asset)}
          >
            Add to Borrow
          </button>
        </div>
      </section>
    </div>
    )}
  </div>
  <Notification show={cartNotification} setShow={setCartNotification} title={"Successfully added!"} subtitle={"Click the cart to view assets"}/>
  <RelatedLists title={'Residents also borrow'}/>
</>
    )
  )
}
