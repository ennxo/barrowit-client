import { axiosPrivate } from "../../../libs"

export const getReservation = (id) => `api/reservation/${id}`

export const reserveAsset = (data) => {
    return axiosPrivate.post(`/api/reservation`, data)
} 