import { Routes, Route } from "react-router-dom"
import {
  AddAccount,
  UpdateAccount,
  Table,
  ViewAccount,
  AdminTable,
  AddAdmin,
  ViewAdmin,
  UpdateAdmin,
} from "../components"
import { NotFound } from "../../misc"
import { Tabs } from "../../../components/Navigations"
import { tabsData } from "../data"

export const Accounts = () => {
  return (
    <Routes>
      <Route element={<Tabs tabsData={tabsData} />}>
        <Route index path="/" element={<Table />} />
        <Route index path="admin" element={<AdminTable />} />
      </Route>
      <Route path="/:id" element={<ViewAccount />} />
      <Route path="add" element={<AddAccount />} />
      <Route path="update/:id" element={<UpdateAccount />} />
      <Route path="admin/:id" element={<ViewAdmin/>} />
      <Route path="admin/update/:id" element={<UpdateAdmin/>} />
      <Route path="admin/add" element={<AddAdmin/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
