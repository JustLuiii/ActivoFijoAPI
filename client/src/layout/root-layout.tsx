import { SidebarProvider } from "@/components/ui/sidebar"
import { MainSidebar } from "@/components/main-sidebar"
import { Navbar } from "@/components/navbar"
import { Outlet } from "react-router"


export const RootLayout = () => {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <MainSidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

