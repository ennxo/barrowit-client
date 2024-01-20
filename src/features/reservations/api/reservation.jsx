import { axiosPrivate } from "../../../libs"

export const getRequests = (status) => {
    return `/api/reservation/${status}/all`
}

export const getRequest = (id, status) => {
    return `/api/reservation/${status}/${id}`
} 

export const approveRequest = (id) => {
    return axiosPrivate.put(`/api/reservation/approve/${id}`)
}

export const cancelRequest = (id) => {
    return axiosPrivate.put(`/api/reservation/cancel/${id}`)
}

export const completeRequest = (accountId, ids) => {
    const stringifiedArray = JSON.stringify(ids)
    return axiosPrivate.post(`/api/reservation/complete/${accountId}`, stringifiedArray)
}
