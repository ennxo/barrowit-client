import { axiosPrivate } from "../../../libs"

export const getEvents = '/api/event/all'

export const getEvent = (id) => `/api/event/${id}`

export const addEvent = (data) => {
    return axiosPrivate.post('/api/event/add', data)
}

export const updateEvent = (data, id) => {
    return axiosPrivate.put(`/api/event/update/${id}`, data)
}

export const deleteEvent = (ids) => {
    const stringifiedArray = JSON.stringify(ids)
    return axiosPrivate.post(`/api/event/delete`, stringifiedArray)
}

export const getRecommendEvents = "/api/event/recommend/all"
export const getEventAssets = (id) => `/api/event/assets/${id}`

export const addEventAsset = (event_id, ids) => {
    const stringifiedArray = JSON.stringify(ids)
    return axiosPrivate.post(`/api/event/add/asset/${event_id}`, stringifiedArray)
}

export const deleteAsset = (event_id, ids) => {
    const stringifiedArray = JSON.stringify(ids)
    return axiosPrivate.post(`/api/event/delete/asset/${event_id}`, stringifiedArray)
}

