import { useState } from "react"

export const useError = () => {
    const [error, setError] = useState({
        status: false, 
        message: ""
    })
    return [error, setError]
}