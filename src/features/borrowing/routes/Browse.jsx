import { BorrowHistory, BorrowSummary, BrowseAssets, Checkout, Overview } from "../components"
import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "../../../utils"
import { NotFound } from "../../misc"
import { Profile } from "../../profiles"


export const Browse = () => {
  return (
    <Routes>
      <Route path="/browse" element={<BrowseAssets />} />
      <Route path="asset/:id" element={<Overview />} />
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="profile" element={<Profile/>}/>
        <Route path="asset/reserve" element={<Checkout />} />
        <Route path="asset/reserve/summary" element={<BorrowSummary />} />
        <Route path="/history" element={<BorrowHistory/>}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
