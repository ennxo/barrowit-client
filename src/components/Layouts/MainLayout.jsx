import { Outlet } from "react-router-dom"

export const MainLayout = () => {
  return (
    <>
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
    </>
  )
}
