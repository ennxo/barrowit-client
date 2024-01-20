import { Route, Routes } from "react-router-dom"
import { AddAsset, StockTable, Table, UpdateAsset, ViewAsset } from "../components"
import { NotFound } from "../../misc"
import { Tabs } from "../../../components/Navigations"
import { tabsData } from "../data"

export const Assets = () => {
    return ( 
        <Routes>
            <Route element={<Tabs tabsData={tabsData} />}>
            <Route index path="/" element={<Table/>}/>
            <Route path="stocks" element={<StockTable/>}/>
            </Route>
            <Route path="add" element={<AddAsset />}/>
            <Route path="update/:id" element={<UpdateAsset/>}/>
            <Route path="view/:id" element={<ViewAsset/>}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
     )
}