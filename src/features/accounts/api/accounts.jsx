import { axiosFile, axiosPrivate } from "../../../libs"

export const getAccounts = '/api/user-profile/all' 
export const getAccount = (id) => {
    return `/api/user-profile/${id}`
}

export const addAccount = (data) => {
    return axiosFile.post('/api/user-profile/add', data)
}

export const updateAccount = (id, data) => {
    return axiosFile.put(`/api/user-profile/update/${id}`, data)
}

export const deleteAccount = (ids) => {
    const stringifiedArray = JSON.stringify(ids)
    return axiosPrivate.post("/api/user-profile/delete", stringifiedArray)
}

export const verifyAccount = (id) => {
    return axiosPrivate.put(`/api/user-profile/verify/${id}`)
}