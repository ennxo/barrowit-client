import { Routes, Route } from "react-router-dom"
import { AddItem, Table } from "../components"
import { NotFound } from "../../misc"

export const Items = () => {
    return ( 
        <Routes>
            <Route index path="/:id" element={<Table/>}/>
            <Route path=":id/add" element={<AddItem/>}/>
            <Route path="*" element={<NotFound/>} />
        </Routes>
     )
}