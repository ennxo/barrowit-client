import { useFetch } from "../../../hooks"
import { getCategories } from "../../categories/api"

export const categories = () => {
  const { data: categories } = useFetch(getCategories)
  return categories?.map((category) => ({value: category?.id, label: category?.title}))
}
