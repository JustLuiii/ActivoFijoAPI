// import { Button } from "@/components/ui/button"
// import { ModeToggle } from "./components/modeToggle"

import { Route, Routes } from "react-router"
import { RootLayout } from "./layout/root-layout"
import { DashBoardPage } from "./pages/dashboard-page"
import { DepartmentsPage } from "./pages/departments/departments-page"
import { DepartmentList } from "./pages/departments/department-list"
import { NewDeparment } from "./pages/departments/new-department"
import { EditDepartment } from "./pages/departments/edit-department"

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
        </Route>
      </Routes>
    </>
  )
}

export default App
