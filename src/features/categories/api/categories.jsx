import { axiosPrivate } from "../../../libs"

export const getCategories = '/api/category/all'
export const getCategory = (id) => {
    return`/api/category/${id}`
}

export const addCategory = (data) => {
    return axiosPrivate.post('/api/category/add', data)
}

export const updateCategory = (data, id) => {
    return axiosPrivate.put(`/api/category/update/${id}`, data)
}

export const deleteCategory = (ids) => {
    const stringifiedArray = JSON.stringify(ids)
    return axiosPrivate.post(`/api/category/delete`, stringifiedArray)
}

