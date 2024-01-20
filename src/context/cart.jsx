import { useEffect } from "react"
import { createContext, useState } from "react"
import { useAuth, useAxiosPrivate, useFetch } from "../hooks"
import { addCart, getCarts } from "../features/borrowing/api"
import { useErrorBoundary } from "react-error-boundary"
import jwt_decode from "jwt-decode"
import { useMemo } from "react"

export const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const CART = 'cart'
  const { auth } = useAuth()
  const axios = useAxiosPrivate()
  const { showBoundary } = useErrorBoundary()
  const cartsFromLocalStorage = JSON.parse(localStorage.getItem(CART) || '[]')
  const [carts, setCarts] = useState(cartsFromLocalStorage)
  const [cartNotification, setCartNotification] = useState(false)
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined
  const roles = decoded?.roles || []
  const isUser = roles === "user"

  const addCarts = (data, quantity) => {
    const cartIndex = carts.findIndex((c) => c.id === data.id)
    const quantityToAdd = Number(quantity)
    if (cartIndex !== -1) {
      const updatedCart = [...carts]
      updatedCart[cartIndex].total_quantity += quantityToAdd
      setCarts(updatedCart)
    } else {
      setCarts((prev)=> [...prev, {...data, total_quantity: quantityToAdd}])
    }
    setTimeout(() => {
      setCartNotification(false)
    }, 6000)
  }
  
  useEffect(() => {
    const saveCartToDatabase = async () => { 
      try {
        const profileCarts = carts.map((cart) => {
          return { asset_id: cart.id, total_quantity: cart.total_quantity, profile_id: auth?.["profile"]?.id && auth["profile"]?.id }
        })
        await addCart(profileCarts)
      } catch (error) {
        showBoundary(error)
      }
    }

    const saveCartToLocalStorage = () => {
      localStorage.setItem(CART, JSON.stringify(carts))
    }
    !carts.length === 0 && saveCartToLocalStorage()

    const timeout = setTimeout(() => {
      carts.length > 0 && isUser && saveCartToDatabase()
    }, 3000)

    return () => clearTimeout(timeout)
  },[carts])

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const { data } = await axios.get(getCarts(auth['profile']?.id))
        setCarts((prev) => {
          const result = prev?.map((newCart) => {
            const {id, name, image, description, status, category_id, total_quantity, Category, total_cost} = newCart
            const newCarts = {id, name, image, description, status, category_id, total_quantity, Category}
            const carts = data?.map((cart) => {
              if(newCart.id === cart.id && total_cost) {
                cart.total_quantity += total_quantity
              }
              return cart
            })
            return newCarts ? {...newCarts, ...carts} : carts
          })
          return result.length === 0 ? data : result
        })
      } catch (error) {
        showBoundary(error)
      }
    }
    isUser && fetchCarts()
  }, [roles])

  const contextValue = useMemo(() => ({carts, setCarts, addCarts, cartNotification,setCartNotification}),[carts, cartNotification])

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}
