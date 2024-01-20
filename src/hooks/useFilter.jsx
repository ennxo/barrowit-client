import { useContext } from "react"
import { FilterContext } from "../context/filter"

export const useFilter = () => {
  return useContext(FilterContext)
}