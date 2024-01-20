import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid"
import { Link, useNavigate } from "react-router-dom"
import { useAuth, useCart, useError, useFetch } from "../../../hooks"
import { removeCart, getClientAssets, reserveAsset } from "../api"
import { EmptyState } from "./EmptyState"
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { cartsValidation } from "../validations"
import { useEffect, useMemo } from "react"
import { cn } from "../../../utils"
import { Error } from "../../../components/Misc"
import { DateTime, TextArea } from "../../../components/Forms"
import { useErrorBoundary } from "react-error-boundary"

export const Checkout = () => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const { showBoundary } = useErrorBoundary()
  const { carts, setCarts } = useCart()
  const { data: assets } = useFetch(getClientAssets)
  const [error, setError] = useError()
  const total = carts.reduce((n, { total_quantity }) => n + total_quantity || 0 , 0)
  
  
  const { register, control, setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(cartsValidation(assets)),
    defaultValues: useMemo(() => {
      return {carts: carts}
    },[carts])
  })
  
  const { fields } = useFieldArray({control, name: 'carts'})
  
  const onSubmit = async (data) => {
    const result = data.carts.map((cart) => {
      return { asset_id: cart.id, quantity: cart.total_quantity, borrow_date: data.borrow_date, return_date: data.return_date, purpose: data.purpose, profile_id: auth["profile"].id }
    })
    try {
      await reserveAsset(result)
      setError({})
      navigate('summary')
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  const handleOperation = (id, operation) => {
    const updatedCart = carts.map((asset) => {
      if(asset.id === id) {
        let total_quantity = Number(asset.total_quantity)
        return operation === 'plus' ? 
        { ...asset, total_quantity: total_quantity + 1 } : 
        { ...asset, total_quantity: isNaN(total_quantity) || total_quantity <= 1 ? 1 : total_quantity - 1 } 
      } else {
        return asset
      }})
    setCarts(updatedCart)
  }

  const handleQuantityChange = (e, id) => {
    const quantity = parseInt(e.target.value)
    const newQuantity = quantity <= 0 ? 1 : quantity
    setCarts((prev) =>
      prev.map((asset) => asset.id === id ? { ...asset, total_quantity: newQuantity } : asset))
  }

  const removeToCart = async(id) => {
    try {
      await removeCart(id)
      setCarts(prev => prev.filter(asset => asset.id !== id))
    } catch (error) {
      showBoundary(error)
    }
  }

  useEffect(() => {
    let hasMounted = true
    hasMounted && setValue('carts', carts)
    return () => hasMounted = false
  }, [carts])

  return carts.length === 0 ? (<EmptyState />):
  (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Reservation Checkout</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Reservation information
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div className="sm:col-span-3">
                <DateTime 
                control={control}
                name="borrow_date"
                label="Borrow Date"
                errors={errors}
                placeholder={"Select a borrow date"}
                />
                <DateTime 
                control={control}
                name="return_date"
                label="Return Date"
                errors={errors}
                placeholder={"Select a return date"}
                />
                <TextArea
                    name="purpose"
                    label="Purpose"
                    type="text"
                    errors={errors}
                    register={register}
                    placeHolder="Enter your purpose of borrowing"
                    notes="Specify your purpose"
                    rows={3}
                    />
              </div>
              <div className="sm:col-span-2">
              <label htmlFor="terms" className="flex-wrap text-sm text-gray-600 w-42">
              <input
                  {...register(`terms`)}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-2"
                />
                  By ticking, your are confirming that you read, understood, and agree to <Link to="/terms-and-conditions" target="_blank" className="text-green-700">Barangay terms and condition</Link>
                </label>
                <p className="mt-2 text-xs text-red-600" id={"terms-error"}>
              {errors.terms && `*${errors.terms?.message}`}
              </p>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {carts.map((cart, index) => { 
                  const field = fields[index]
                  return (
                  <li key={cart.id} className="flex py-6 px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={cart.image}
                        alt={cart.name}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <Link
                              to={`/asset/${cart.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {cart.name}
                            </Link>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {cart.Category.title}
                          </p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            onClick={() => removeToCart(cart.id)}
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <div className="flex mt-1 text-sm font-medium text-gray-900">
                          Qty
                          <button
                            type="button"
                            className="h-5 rounded-md border border-gray-300 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            onClick={() => handleOperation(cart.id, 'minus')}
                          >
                            <MinusIcon className="h-4" aria-hidden="true" />
                          </button>
                          <div className="relative shadow-sm">
                            <input
                              {...register(`carts.${index}.total_quantity`)}
                              type="number"
                              value={cart.total_quantity}
                              onChange={e => handleQuantityChange(e, cart.id)}
                              className={cn('h-5 w-10 text-center appearance-none rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm', {'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500': errors?.carts?.[index]?.total_quantity?.message})}
                            />
                          </div>
                          <button
                            type="button"
                            className="h-5 rounded-md border border-gray-300 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            onClick={() => handleOperation(cart.id, 'plus')}
                          >
                            <PlusIcon className="h-4" aria-hidden="true" />
                          </button>     
                          <p className="text-xs text-red-600" id={`carts-error`}>
                          {errors.carts?.[index] && `*${errors.carts?.[index]?.total_quantity.message}`}
                          </p> 
                        </div>
                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                )})}
              </ul>
              <dl className="space-y-6 py-6 px-4 sm:px-6">
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Quantity</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {total}
                  </dd>
                </div>
                <Error error={error.status} message={error.message} />
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-green-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm borrow
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
