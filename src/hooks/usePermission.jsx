import { permissions } from "../data"
import { useAuth } from "./useAuth"

export const usePermission = () => {
    const { auth } = useAuth()
    const { profile } = auth
    const hasPermission = (permissionName) => {
        return permissions[permissionName].includes(profile.User?.roles)
    }
    return { hasPermission }
}