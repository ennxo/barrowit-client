import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks"
import jwt_decode from "jwt-decode"

export const ProtectedRoute = ({ allowedRoles }) => {
    const { auth } = useAuth()
    const location = useLocation()
    const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined

    const roles = decoded?.roles || []

    return ( 
        allowedRoles?.includes(roles)
        ? <Outlet/> 
        : auth?.accessToken ? <Navigate to="/unauthorized" state={{from: location}} replace/> 
        : <Navigate to="/auth/login" state={{from: location}} replace />
    )
}