import { Outlet, useNavigate } from "react-router-dom"
import { useState, useEffect} from "react"
import { useRefreshToken } from "../hooks"
import { useAuth }from "../hooks"
import { Spinner } from "../components/Spinner"

export const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth, persist } = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (err) {
            //    navigate('/auth/login')
            }finally {
                isMounted && setIsLoading(false)
            }
        }
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)
        return () => isMounted = false
    }, [])
    
    return (
        <>
        {!persist 
            ? <Outlet/>
            : isLoading 
                ? <Spinner/> 
                : <Outlet/>
        }
        </>
    )
}