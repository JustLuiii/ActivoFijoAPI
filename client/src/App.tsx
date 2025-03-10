// import { Button } from "@/components/ui/button"
// import { ModeToggle } from "./components/modeToggle"

import { Route, Routes } from "react-router"
import { RootLayout } from "./layout/root-layout"
import { DashBoardPage } from "./pages/dashboard-page"
import { DepartmentsPage } from "./pages/departments/departments-page"
import { DepartmentList } from "./pages/departments/department-list"
import { NewDeparment } from "./pages/departments/new-department"
import { EditDepartment } from "./pages/departments/edit-department"
import { EmployeesPage } from "./pages/employees/employees-page"
import { EmployeesList } from "./pages/employees/employees-list"
import { NewEmployee } from "./pages/employees/new-employee"
import { EditEmployee } from "./pages/employees/edit-employee"
import { AssetTypeForm } from "./components/asset-type-form"
import { AssetTypesList } from "./pages/asset-types/asset-types-list"
import { NewAssetType } from "./pages/asset-types/new-asset-type"
import { EditAssetType } from "./pages/asset-types/edit-asset-type"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<DashBoardPage />} />
          <Route path="departments" element={<DepartmentsPage />}>
            <Route index element={<DepartmentList />} />
            <Route path="new" element={<NewDeparment />} />
            <Route path=":id/edit" element={<EditDepartment />} />
          </Route>
          <Route path="employees" element={<EmployeesPage />}>
            <Route index element={<EmployeesList />} />
            <Route path="new" element={<NewEmployee />} />
            <Route path=":id/edit" element={<EditEmployee />} />
          </Route>
          <Route path="asset-types" element={<AssetTypeForm />}>
            <Route index element={<AssetTypesList />} />
            <Route path="new" element={<NewAssetType />} />
            <Route path=":id/edit" element={<EditAssetType />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
