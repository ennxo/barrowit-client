import { cn } from "../../../utils"
import { Link } from "react-router-dom"
export const HeaderButtons = () => {
  const buttons = [
    { name: "Sign In", to: "/auth/login", extraClass: "text-orange-600 border-orange-600 bg-orange-600 focus:ring-green-500 text-white hover:bg-orange-700" },
    { name: "Create Account", to: "/auth/register", extraClass: "border-transparent bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white" },
  ]

  return (
    <div className="flex-shrink-0 flex gap-3 mr-4">
      {buttons.map((button, index) => {
        return (
            <Link 
              to={button.to}
              key={index}
              className={cn("relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-gray-500 shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2", button.extraClass)}
            >
              <span>{button.name}</span>
            </Link>
        )
      })}
    </div>
  )
}
