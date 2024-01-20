import { Route, Routes } from "react-router-dom"
import { Table, ViewReport } from "../components"

export const Reports = () => {
  return (
    <Routes>
        <Route index path="/" element={<Table/>}/>
        <Route path="view/:id" element={<ViewReport/>}/>
    </Routes>
  )
}
