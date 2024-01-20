import { axiosPrivate } from "../../../libs"

export const getArchivedAccounts = '/api/user-profile/archive/all'

export const getArchivedAccount = (id) => `/api/user-profile/archive/${id}`

export const restoreAccounts = (ids) => {
    const stringifiedArray = JSON.stringify(ids)
    return axiosPrivate.post('/api/user-profile/restore', stringifiedArray)
}