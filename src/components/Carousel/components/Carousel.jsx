import { useRef } from "react"
import { Navigation, Pagination, EffectFade } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { images } from "../data"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export const Carousel = () => {
  const swiperRef = useRef()
  return (
    <div className="mx-auto max-w-7xl mb-10">
    <Swiper
    style={{
      "--swiper-navigation-color": "#ffffff",
      "--swiper-navigation-size": "35px",
      "--swiper-pagination-color": "#047857",
    }}
      modules={[Navigation, Pagination, EffectFade]}
      spaceBetween={10}
      slidesPerView={1}
      effect={'fade'}
      onSwiper={(swiper) => {
        swiperRef.current = swiper
      }}
      pagination={{
        dynamicBullets: true,
      }}
      className="h-40 sm:h-96 min-w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="flex w-full h-full justify-center">
            <img loading="lazy" src={image} alt={`Slide ${index}`}  className="block min-h-full min-w-full object-fill"/>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-button-next bg-gray-900 opacity-80 rounded-md hover:bg-orange-400 p-0" onClick={() => swiperRef.current?.slideNext()}><ChevronRightIcon/></div>
      <div className="swiper-button-prev bg-gray-900 opacity-50 rounded-md hover:bg-orange-400 p-0" onClick={() => swiperRef.current?.slidePrev()}><ChevronLeftIcon/></div>
    </Swiper>
    </div>
  )
}
