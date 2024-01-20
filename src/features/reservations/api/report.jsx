import { axiosPrivate } from "../../../libs"

export const reportAsset = (data) => {
    return axiosPrivate.post('/api/report/generate', data)
}