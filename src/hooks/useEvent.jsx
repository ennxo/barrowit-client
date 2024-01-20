import { getRecommendEvents } from "../features/events/api"
import { useFetch } from "./useFetch"

export const useEvent = () => {
    const localEventList = JSON.parse(localStorage.getItem("recommend") || false)
    const { data: recommendEvents } = useFetch(getRecommendEvents)
    const eventList = recommendEvents.map((recommend) => ({
      value: recommend.title,
      label: recommend.title,
      checked: false,
      arrValue: recommend?.Assets.map((asset) => asset.name).sort(() => Math.random() - 0.5)
    }))
    return eventList
}