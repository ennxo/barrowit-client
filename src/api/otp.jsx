import { axiosPublic } from '../libs'

export const requestOTP = (data) => {
    return axiosPublic.post('/api/otp/request', data)
}

export const verifyOTP = (data) => {
    return axiosPublic.post('/api/otp/verify', data)
}

