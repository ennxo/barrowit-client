import { ArrowUpCircleIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"

export const BackToTop = () => {
    const [backTop, setBackTop] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 1000) {
                setBackTop(true)
            }
            else {
                setBackTop(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
 
    return backTop && ( 
        <button onClick={scrollUp} className="flex justify-center items-center fixed bottom-5 right-0 h-12 w-12 rounded-s-md text-xl z-30 bg-green-700 hover:bg-green-900">
            <ArrowUpCircleIcon className="h-8 text-orange-500"/>
        </button>
     )
}