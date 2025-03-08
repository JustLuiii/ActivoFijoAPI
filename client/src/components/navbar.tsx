import { LogOutIcon } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { SidebarTrigger } from "./ui/sidebar"



export const Navbar = () => {

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <SidebarTrigger className="mr-2" />
        <div className="ml-auto flex items-center space-x-2">
          <ModeToggle />
          <Button variant="outline" size="icon" title="Cerrar sesión">
            <LogOutIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Cerrar sesión</span>
          </Button>
        </div>
      </div>
    </header>
  )

}