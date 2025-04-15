import { Outlet } from "react-router"


export const EmployeesPage = () => {

    return (
        <div className="space-y-6">
            <Outlet />
        </div>
    )
}