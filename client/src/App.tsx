// import { Button } from "@/components/ui/button"
// import { ModeToggle } from "./components/modeToggle"

import { Route, Routes } from "react-router"
import { RootLayout } from "./layout/root-layout"
import { DashBoardPage } from "./pages/dashboard-page"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<DashBoardPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
