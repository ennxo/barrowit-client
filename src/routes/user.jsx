import { Route, Routes } from "react-router-dom"
import { lazyLoad } from "../utils"
const { UserLayout } = lazyLoad(() => import("../components/Layouts"), "UserLayout")
const { Browse } = lazyLoad(() => import("../features/borrowing"), "Browse")
const { Landing } = lazyLoad(() => import("../features/misc"), "Landing")
const { TermsAndConditions } = lazyLoad(() => import("../features/misc"), "TermsAndConditions")
const { About } = lazyLoad(() => import("../features/misc"), "About")
const { Frequent } = lazyLoad(() => import("../features/misc"), "Frequent")

export const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<UserLayout/>}>
      <Route path="/" element={<Landing />} />
      <Route index path="*" element={<Browse/>}/>
      <Route path="/about" element={<About />} />
      <Route path="/faqs" element={<Frequent />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>    
    </Routes>
  )
}
