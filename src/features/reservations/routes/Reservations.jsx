import { Routes, Route } from "react-router-dom"
import {
  PendingDetails,
  ApprovedTable,
  CancelledTable,
  CompletedTable,
  PendingTable,
  ApprovedDetails,
  CompletedDetails,
  CancelledDetails,
} from "../components"
import { NotFound } from "../../misc"
import { Tabs } from "../../../components/Navigations"
import { tabsData } from "../data"
import { ViewAccount } from "../../accounts"

export const Reservations = () => {
  return (
    <Routes>
      <Route element={<Tabs tabsData={tabsData} />}>
        <Route index element={<PendingTable />} />
        <Route path="/approved" element={<ApprovedTable />} />
        <Route path="/completed" element={<CompletedTable />} />
        <Route path="/cancelled" element={<CancelledTable />} />
      </Route>
      <Route path="/view/:id" element={<ViewAccount />} />
      <Route path="/details/:id" element={<PendingDetails />} />
      <Route path="approved/details/:id/:status?" element={<ApprovedDetails />} />
      <Route path="completed/details/:id" element={<CompletedDetails />} />
      <Route path="cancelled/details/:id" element={<CancelledDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
