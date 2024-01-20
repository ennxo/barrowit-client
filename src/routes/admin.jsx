import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "../utils"
import { Sidebar } from "../components/Sidebar"
import { lazyLoad } from "../utils"
import { adminRoles } from "../data"
const { Dashboard } = lazyLoad(() => import("../features/dashboard"), "Dashboard")
const { AdminProfile } = lazyLoad(() => import("../features/profiles"), "AdminProfile")
const { Categories } = lazyLoad(() => import("../features/categories"),"Categories")
const { Events } = lazyLoad(() => import("../features/events"), "Events")
const { Assets } = lazyLoad(() => import("../features/assets"), "Assets")
const { Items } = lazyLoad(() => import("../features/items"), "Items")
const { Accounts } = lazyLoad(() => import("../features/accounts"), "Accounts")
const { Reservations } = lazyLoad(() => import("../features/reservations"), "Reservations")
const { Returned } = lazyLoad(() => import("../features/returned"), "Returned")
const { Archived } = lazyLoad(() => import("../features/archived"), "Archived")
const { Schedules } = lazyLoad(() => import("../features/schedules"), "Schedules")
const { Reports } = lazyLoad(() => import("../features/reports"), "Reports")
const { AuditTrail } = lazyLoad(() => import("../features/audit"), "AuditTrail")
const { NotFound } = lazyLoad(() => import("../features/misc"), "NotFound")

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<Sidebar/>}>
        <Route element={<ProtectedRoute allowedRoles={adminRoles} />}>
          <Route index path="/" element={<Dashboard/>} />
          <Route path="/panel/profile" element={<AdminProfile/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/events/*" element={<Events/>}/>
          <Route path="/assets/*" element={<Assets/>}/>
          <Route path="/transactions/*" element={<Returned/>}/>  
          <Route path="/items/*" element={<Items/>}/>
          <Route path="/accounts/*" element={<Accounts/>}/>
          <Route path="/schedules/" element={<Schedules/>}/>
          <Route path="/reports/*" element={<Reports/>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin", "editor"]} />}>
          <Route path="/reservations/*" element={<Reservations/>}/>
          <Route path="/archived/*" element={<Archived/>}/>
          <Route path="/audits/*" element={<AuditTrail/>}/>
        </Route>  
      </Route>
      <Route path="*" element={<NotFound />} />  
    </Routes>
  )
}
