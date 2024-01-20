import { BarChart, Stats } from '../components'
import { AdminLayout } from "../../../components/Layouts"

export const Dashboard = () => {
    return ( 
        <AdminLayout title="Dashboard">
        <Stats/>
        <BarChart/>
        </AdminLayout>
     )
}