import { useEffect, useState } from "react"
import { Carousel } from "../../../components/Carousel"
import { Hotline } from "./Hotline"

import { format } from "date-fns"
import { RecommendList } from "./RecommendList"
import { Pages } from "./Pages"
import { BackToTop } from "../../../components/Navigations"

export const Landing = () => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formattedDate = format(date, `EEEE, MMMM d, yyyy h:mm:ss a`)

  return (
    <>
      <div className="bg-green-600 text-white">
        <div className="flex flex-col justify-center text-center sm:text-left sm:flex-row sm:justify-between mx-auto max-w-7xl py-5 px-6 sm:py-5 lg:px-5">
          <div>
            <h2 className="text-lg font-semibold">
              Republic of the Philippines
            </h2>
            <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
              Barangay 171 Bagumbong, Caloocan City
            </p>
          </div>
          <div className="sm:text-right max-w-xl text-sm">
            <p>Philippine Standard Time: </p>
            <time>{formattedDate}</time>
          </div>
        </div>
      </div>
      <div className="relative pt-5 bg-white min-h-screen">
        <Carousel />
        <RecommendList />
        <Hotline />
        <Pages />
      </div>
      <BackToTop />
    </>
  )
}
