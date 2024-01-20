import { createContext, useState, useMemo, useEffect, } from "react"
import { useAxiosPrivate } from "../hooks"
import { getCategories } from "../features/categories"
import { useErrorBoundary } from "react-error-boundary"
import { sortData } from "../features/borrowing"
import { getRecommendEvents } from "../features/events"

export const FilterContext = createContext({})

export const FilterProvider = ({ children }) => {
  const axios = useAxiosPrivate()
  const { showBoundary } = useErrorBoundary()
  const localCategories = JSON.parse(localStorage.getItem("category") || "[]")
  const localEvents = JSON.parse(localStorage.getItem("recommend") || "[]")
  const [query, setQuery] = useState("")
  const [categories, setCategories] = useState(localCategories)
  const [recommendations, setRecommendations] = useState(localEvents)
  const [sortOptions, setSortOptions] = useState(sortData)
  const [sortType, setSortType] = useState("Default")
  const checkedCategories = categories.reduce((acc, curr) => (curr.checked && acc.push(curr.value), acc),[])
  const checkedRecommendations = recommendations.reduce((acc, curr) => (curr.checked ? curr.arrValue : acc), []);
  const [check, setCheck] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(getCategories)
        const categoryList = data?.map((category) => ({
          value: category.title,
          label: category.title,
          checked: false,
        }))
        const orderedCategories = categoryList.sort((a, b) => a.value.localeCompare(b.value))
        localCategories.length === 0 && setCategories(orderedCategories)
      } catch (error) {
        showBoundary(error)
      }
    }
    fetchCategories()
    localStorage.setItem("category", JSON.stringify(categories))
  }, [check])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
      const { data } = await axios.get(getRecommendEvents)
      const eventList = data?.map((recommend) => ({
        value: recommend.title,
        label: recommend.title,
        checked: false,
        arrValue: recommend?.Assets.map((asset) => asset.name).sort(() => Math.random() - 0.5)
      }))
      localEvents.length === 0 && setRecommendations(eventList)
      } catch (error) {
        showBoundary(error)
      }
    }
    fetchEvents()
    localStorage.setItem("recommend", JSON.stringify(recommendations))
  }, [check])

  useEffect(() => {
    localStorage.setItem("recommend", JSON.stringify(recommendations))
  }, [recommendations])

  useEffect(() => {
    localStorage.setItem("sort", JSON.stringify(sortOptions))
  },[sortOptions])

  const contextValue = useMemo(() => ({
    query,
    setQuery,
    sortType,
    setSortType,
    categories,
    setCategories,
    checkedCategories,
    checkedRecommendations,
    recommendations,
    setRecommendations,
    sortOptions,
    setSortOptions,
    setCheck,
  }), [categories, sortType, recommendations, sortOptions, query, check])
    
  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  )
}