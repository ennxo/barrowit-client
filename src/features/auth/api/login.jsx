import { axiosPublic } from "../../../libs"

export const loginCredentials = (data) => {
  return axiosPublic.post("/api/auth/login", data)
}

export const resetPassword = (data) => {
  return axiosPublic.post("/api/auth/reset", data)
}

export const forgetOTP = (data) => {
  return axiosPublic.post("/api/otp/forget", data)
}

export const requestOTP = (data) => {
  return axiosPublic.post("/api/otp/request", data)
}
