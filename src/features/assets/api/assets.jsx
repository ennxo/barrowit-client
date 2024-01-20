import { axiosFile, axiosPrivate } from '../../../libs'

export const getAssets = '/api/asset/all'

export const getAsset = (id) => {
    return `/api/asset/${id}`
}

export const addAsset = (data) => {
    return axiosFile.post('/api/asset/add/', data)
}

export const updateAsset = (id, data) => {
    return axiosFile.put(`/api/asset/update/${id}`, data)
}

export const deleteAsset = (ids) => {
    const stringifiedArray = JSON.stringify(ids)
    return axiosPrivate.post(`/api/asset/delete`, stringifiedArray)
}


