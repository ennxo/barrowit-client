import { axiosPrivate } from "../../../libs"

export const getArchivedAssets = '/api/asset/archive/all'

export const getArchivedAsset = (id) => {
    return `/api/asset/archive/${id}`
}

export const restoreAssets = (ids) => {
    const stringifiedArray = JSON.stringify(ids)
    return axiosPrivate.post('/api/asset/restore', stringifiedArray)
}