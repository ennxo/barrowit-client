import { useEffect } from "react"
import { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { cn } from "../../../utils"

export const Tabs = ({ tabsData }) => {
    const [tabs, setTabs] = useState(tabsData)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleTabClick = (clickedTab) => {
        const updatedTabs = tabs.map((tab) =>({
            ...tab, 
            current: tab.name === clickedTab.name
        }))
        setTabs(updatedTabs)
    }

    useEffect(() => {
      const currentTab = tabs.find(tab => tab.to === pathname)
      if (currentTab) {
        handleTabClick(currentTab)
      }
    }, [pathname])

    return (
      <>
      <div className="px-7 pt-10">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 p-2 focus:border-green-500 focus:ring-green-500"
            defaultValue={tabs.find((tab) => tab.current).name}
            onChange={e=> handleTabClick(tabs.find((tab) => tab.name === e.target.value))}
          >
            {tabs.map((tab) => (
              <option key={tab.name} onClick={() => navigate(tab.to)}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.to}
                className={cn(
                  tab.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                  'px-3 py-2 font-medium text-sm rounded-md'
                )}
                aria-current={tab.current ? 'page' : undefined}
                onClick={() => handleTabClick(tab)}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <Outlet/>
      </>
    )
  }
  