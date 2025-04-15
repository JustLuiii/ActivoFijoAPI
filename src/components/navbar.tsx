import { LogOutIcon } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { SidebarTrigger } from "./ui/sidebar"
import { useNavigate } from "react-router"



export const Navbar = () => {

  const navigate = useNavigate();

  const handleOnCerrarSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenServices");
    localStorage.removeItem("email");
    navigate('/login', { replace: true })
  }

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <SidebarTrigger className="mr-2" />
        <div className="ml-auto flex items-center space-x-2">
          <ModeToggle />
          <Button variant="outline" size="icon" title="Cerrar sesión" onClick={handleOnCerrarSession}>
            <LogOutIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Cerrar sesión</span>
          </Button>
        </div>
      </div>
    </header>
  )

}