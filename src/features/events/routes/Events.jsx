import { Route, Routes } from "react-router-dom"
import { EventAsset, Table } from "../components"
import { NotFound } from "../../misc"

export const Events = () => {
  return (
    <Routes>
      <Route index path="/" element={<Table />} />
      <Route path="/assets/:id" element={<EventAsset />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
