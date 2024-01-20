import { axiosPublic } from "../libs"
import { useAuth } from "../hooks"

export const useRefreshToken = () => {
  const { setAuth } = useAuth()
  const refresh = async () => {
    const { data } = await axiosPublic.get("/api/auth/refresh")
    const { profile, accessToken } = data
    setAuth((prev) => { 
      return {...prev, profile, accessToken}} )
    return accessToken
  }
  return refresh
}