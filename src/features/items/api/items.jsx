import { axiosPrivate } from "../../../libs"

export const getItems = (id) => {
    return `/api/item/all/${id}`
}

export const getItem = (id) => {
    return `/api/item/${id}`
}

export const addItem = (id, data) => {
    return axiosPrivate.post(`api/item/add/${id}`, data)
}



