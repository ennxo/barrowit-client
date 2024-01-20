import { Routes, Route } from "react-router-dom"
import { Table, ViewAudit } from "../components"

export const AuditTrail = () => {
    
    return (
        <Routes>
            <Route index path="/" element={<Table />} />
            <Route path="view/:id" element={<ViewAudit />} />
        </Routes>
    )
}