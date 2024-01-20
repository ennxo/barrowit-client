import { Route, Routes } from "react-router-dom"
import {
  AccountsTable,
  AssetsTable,
  ViewAssetsArchived,
  ViewAccountsArchived,
} from "../components"
import { Tabs } from "../../../components/Navigations"
import { tabsData } from "../data"

export const Archived = () => {
  return (
    <Routes>
      <Route element={<Tabs tabsData={tabsData} />}>
        <Route path="/" element={<AssetsTable />} />
        <Route index path="/accounts" element={<AccountsTable />} />
      </Route>
      <Route path="view/:id" element={<ViewAssetsArchived />} />
      <Route path="/accounts/view/:id" element={<ViewAccountsArchived />} />
    </Routes>
  )
}
