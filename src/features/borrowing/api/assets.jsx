//Get All Assets for Client Side
export const getClientAssets = '/api/asset/user/all'
export const getRelatedAssets = (id) => `/api/asset/user/related/${id}`

//Get One Asset for Client Side
export const getOneClientAsset = (id) => {
    return `/api/asset/user/${id}`
}



