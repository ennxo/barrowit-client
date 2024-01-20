import { useCallback, useEffect, useState } from "react"
// import { axiosPublic } from "../libs"
import { useAxiosPrivate } from "./useAxiosPrivate"
import { useError } from "./useError"

export const useFetch = (url) => {
  const [data, setData] = useState([])
  const [hasPending, setHasPending] = useState(true)
  const [error, setError] = useError()
  const axios = useAxiosPrivate()

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(url)
      setData(data)
      setHasPending(false)
    } catch (error) {
      setHasPending(false)
      setError({ status: true, message: error.response.data.message})
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData, url])

  return { data, setData, hasPending, fetchData, error, setError }
}