import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import { axiosPrivate } from "../libs"
import { useErrorBoundary } from "react-error-boundary"
import { useCart } from "./useCart"

export const useLogout = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    const { showBoundary } = useErrorBoundary()
    const { setCarts } = useCart()

    const logout = async () => {
        try {
            await axiosPrivate.delete("/api/auth/logout")
            setAuth({})
            setCarts([])
            localStorage.clear()
            navigate("/auth/login")
        } catch (error) {
            showBoundary(error)
        }
    }

    return logout
}

