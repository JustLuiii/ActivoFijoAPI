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
import { AssetTypesList } from "./pages/asset-types/asset-types-list"
import { NewAssetType } from "./pages/asset-types/new-asset-type"
import { EditAssetType } from "./pages/asset-types/edit-asset-type"
import { AssetTypesPage } from "./pages/asset-types/asset-types-page"
import { AssetsPage } from "./pages/assets/assets-page"
import { AssetsList } from "./pages/assets/assets-list"
import { NewAsset } from "./pages/assets/new-asset"
import { EditAsset } from "./pages/assets/edit-asset"
import { AuthLayout } from "./layout/auth-layout"
import LoginPage from "./pages/auth/login-page"
import { DepreciationCalculate } from "./pages/depreciation/depreciation-calculate"
import { UsersPage } from "./pages/users/users.page"
import { UsersList } from "./pages/users/users-list"
import { NewUser } from "./pages/users/new-user"
import { EditUser } from "./pages/users/edit-user"
import { AccountantsPage } from "./pages/accountants/accountants-page"
import { AccountantList } from "./pages/accountants/accountant-list"
import { NewAccountant } from "./pages/accountants/new-accountant"
import { EditAccountant } from "./pages/accountants/edit-accountant"

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route> */}
        <Route path="/">
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            {/* <Route path="signup" element={<SignupPage />} /> */}
          </Route>
          <Route element={<RootLayout />}>
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
            <Route path="asset-types" element={<AssetTypesPage />}>
              <Route index element={<AssetTypesList />} />
              <Route path="new" element={<NewAssetType />} />
              <Route path=":id/edit" element={<EditAssetType />} />
            </Route>
            <Route path="assets" element={<AssetsPage />}>
              <Route index element={<AssetsList />} />
              <Route path="new" element={<NewAsset />} />
              <Route path=":id/edit" element={<EditAsset />} />
            </Route>
            <Route path="users" element={<UsersPage />}>
              <Route index element={<UsersList />} />
              <Route path="new" element={<NewUser />} />
              <Route path=":id/edit" element={<EditUser />} />
            </Route>
            <Route path="accountant-entrys" element={<AccountantsPage />}>
              <Route index element={<AccountantList />} />
              <Route path="new" element={<NewAccountant />} />
              <Route path=":id/edit" element={<EditAccountant />} />
            </Route>
            <Route path="calculate-depreciation" element={<DepreciationCalculate />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
