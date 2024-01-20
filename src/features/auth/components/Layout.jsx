import { Link, Outlet } from "react-router-dom"
import logo from "/logo.png"

export const Layout = ({ title, desc, link, to }) => {  
    return (
      <>
        <div className="flex min-h-screen">
          <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-12 w-auto"
                  src={logo}
                  alt="Barrow It Logo"
                />
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                <p className="mt-2 text-sm text-gray-600">
                  {desc}?{' '}
                  <Link to={to} className="font-semibold text-green-600 hover:text-green-500">
                    {link}
                  </Link>
                </p>
              </div>
  
              <div className="mt-8">
  
                <div className="mt-6">
                  <Outlet/>
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={"/images/02.png"}
              loading="lazy"
              alt="split_image"
            />
          </div>
        </div>
      </>
    )
  }
  