import { AdminLayout } from "../../../components/Layouts";
import { useFetch } from "../../../hooks";
import { getSchedules } from "../api";
import { FullCalendar } from "../components"


export const Schedules = () => {
  const { data: schedules } = useFetch(getSchedules)
  const events = schedules.map((event) => {
    const currentDate = new Date()
    const startDate = new Date(event.start)
    const endDate = new Date(event.end)


    const current = ["bg-green-500", "text-white", "hover: text-gray-900", "hover:bg-green-300"]
    const indicator = currentDate.toDateString() === endDate.toDateString()  ? ["bg-blue-500", "text-white", "hover: text-blue-900", "hover:bg-blue-300"] : 
        currentDate > endDate ? ["bg-red-500", "text-white", "hover: text-red-900", "hover:bg-red-900"] : current
    const style = ["flex-wrap", "text-center", ...indicator]

    return {
      title: event.title,
      start: event.start,
      end: event.end,
      url: `/reservations/approved/details/${event.url}`,
      classNames: style
    }
  })
  return (
    <AdminLayout title="Schedules">
      <div className="flex flex-col space-y-1 sm:space-y-0 sm:space-x-5 sm:flex-row">
      <div class="inline-flex items-center">
      <span class="w-2 h-2 inline-block bg-green-500 rounded-full me-2"></span>
      <span class="text-gray-600 dark:text-gray-400">Currently on transaction</span>
      </div>
      <div class="inline-flex items-center">
      <span class="w-2 h-2 inline-block bg-blue-500 rounded-full me-2"></span>
      <span class="text-gray-600 dark:text-gray-400">For Returning/Pick Up</span>
      </div>
      <div class="inline-flex items-center">
      <span class="w-2 h-2 inline-block bg-red-500 rounded-full me-2"></span>
      <span class="text-gray-600 dark:text-gray-400">Overdue </span>
      </div>
      </div>
      <FullCalendar events={events} />
    </AdminLayout>
  )
}
