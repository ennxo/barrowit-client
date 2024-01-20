import { useMemo } from "react"
import { createContext, useState } from "react"

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState([])
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)  
  const contextValue = useMemo(() => ({auth, setAuth, persist, setPersist}),[auth, persist])
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
