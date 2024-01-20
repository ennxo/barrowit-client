import jwt_decode from "jwt-decode"
import { Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { UserRoutes } from "./user"
import { AdminRoutes } from "./admin"
import { PersistLogin, lazyLoad } from "../utils"
import { useAuth } from "../hooks"
import { Spinner } from "../components/Spinner"
const { TermsAndConditions } = lazyLoad(() => import("../features/misc"), "TermsAndConditions")
const { Frequent } = lazyLoad(() => import("../features/misc"), "Frequent")
const { About } = lazyLoad(() => import("../features/misc"), "About")
const { MainLayout } = lazyLoad(() => import("../components/Layouts"), "MainLayout")  
const { UserLayout } = lazyLoad(() => import("../components/Layouts"), "UserLayout")
const { Unauthorized } = lazyLoad(() => import("../features/misc"),"Unauthorized")
const { NotFound } = lazyLoad(() => import("../features/misc"), "NotFound")
const { Landing } = lazyLoad(() => import("../features/misc"), "Landing")
const { AuthRoutes } = lazyLoad(() => import("../features/auth"), "AuthRoutes")
const { Browse } = lazyLoad(() => import("../features/borrowing"), "Browse")

const App = ({ children }) => {
  return <MainLayout>{children}</MainLayout>
}

const PublicRoutes = ({roles}) => {
  return (
    <Routes>
    <Route element={<UserLayout />}>
      {/* Landing Route */}
      <Route index path="/" element={<Landing />} />
      {/* Available Asset Route */}
      <Route path="*" element={<Browse />} />
      {/* Auth Routes */}
      <Route path="auth/*" element={!roles ? <AuthRoutes /> : <Navigate to="/" />}/>
      {/* Terms and Conditions */}
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/about" element={<About />} />
      <Route path="/faqs" element={<Frequent />} />
    </Route>
    </Routes>
  )
}

const PrivateRoutes = ({roles}) => {
  return (
    <Routes>
    <Route index path="*" element={roles === "user" ? <UserRoutes /> : <AdminRoutes />}/>
    <Route path="auth/*" element={!roles ? <AuthRoutes /> : <Navigate to="/" />}/>
    <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export const AppRoutes = () => {
  const { auth } = useAuth()
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined
  const roles = decoded?.roles || false

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<App />}>
        <Route element={<PersistLogin />}>
          <Route index path="/*" element={auth?.accessToken ? <PrivateRoutes roles={roles} /> : <PublicRoutes roles={roles} />}/>
        </Route>  
          {/* Not Found or Unauthorized Route */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
