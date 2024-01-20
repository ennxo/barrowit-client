import { Routes, Route } from "react-router-dom"
import { CurrentTable, ReturningTable, OverdueTable } from "../components"
import { NotFound } from "../../misc"
import { Tabs } from "../../../components/Navigations"
import { tabsData } from "../data"

export const Returned = () => {
    return (
        <Routes>
        <Route element={<Tabs tabsData={tabsData} />}>
            <Route index element={<CurrentTable />} />
            <Route path="/overdue" element={<OverdueTable />} />
            <Route path="/returning" element={<ReturningTable />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        </Routes>
    )
}