import { axiosPrivate } from "../../../libs"

export const getCarts = (id) => {
    return `/api/cart/all/${id}`
}

export const addCart = (data) => {
    return axiosPrivate.post(`/api/cart/add`, data)
}

export const removeCart = (id) => {
    return axiosPrivate.delete(`/api/cart/remove/${id}`)
}