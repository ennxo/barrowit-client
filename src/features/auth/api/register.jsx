import { axiosFile } from '../../../libs'

export const createAccount = (data) => {
    return axiosFile.post('/api/auth/register', data)
}

