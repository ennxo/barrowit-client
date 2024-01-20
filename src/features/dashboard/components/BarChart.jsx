import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js"
import "chartjs-adapter-date-fns"
import { Bar } from "react-chartjs-2"
import { eachDayOfInterval, format } from "date-fns"
import { useCallback, useEffect, useState } from "react"
import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useFetch } from "../../../hooks"
import { borrowedAssets, damagedAssets } from "../api"

ChartJS.register(LinearScale, BarElement, Title, Tooltip, Legend, TimeScale)

export const BarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const { data: borrowed } = useFetch(borrowedAssets)
  const { data: damaged } = useFetch(damagedAssets)

  const borrow = borrowed.map((asset) => {
    return {
      x: format(new Date(asset.borrow_date), "yyyy-MM-dd"),
      y: asset.quantity,
    }
  })

  const damage = damaged.map((asset) => {
    return {
      x: asset.date_issued,
      y: asset.quantity,
    }
  })



  const filterChart = (newDate) => {
    setSelectedMonth(newDate)
  }

  const month = selectedMonth.getMonth()
  const startDate = new Date(selectedMonth.getFullYear(), month, 1)
  const endDate = new Date(selectedMonth.getFullYear(), month + 1, 0)
  const labels = eachDayOfInterval({ start: startDate, end: endDate })
  
  const options = {
    responsive: true,
    layout: {
      padding: 10,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 18,
          },
        },
      },
      title: {
        display: true,
        text: "Available Assets Chart",
        font: {
          size: 25,
        },
      },
    },
    scales: {
      x: {
        type: "time",
        min: startDate,
        max: endDate,
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 50,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Borrowed Assets",
        data: borrow,
        backgroundColor: "rgba(0, 128, 0, 0.5)",
      },
      {
        label: "Damage Assets",
        data: damage,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  return (
    <div className="my-10">
      <DatePicker
        selected={selectedMonth}
        onChange={filterChart}
        showMonthYearPicker
        showIcon
        icon={<CalendarDaysIcon className="text-gray-900" />}
        dateFormat="MMMM"
        wrapperClassName="w-full"
        className="block w-full lg:w-auto appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
      />
      <Bar options={options} data={data} />
    </div>
  )
}
