import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Footer } from "../Footer"

export const UserLayout = () => {
  return (
    <>
    <Header/>
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
    <Footer/>
    </>
  )
}