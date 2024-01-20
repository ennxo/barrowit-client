import { axiosPrivate } from "../../../libs"

export const changeNewPassword = (data) => {
    return axiosPrivate.post('/api/user-profile/change', data)
}