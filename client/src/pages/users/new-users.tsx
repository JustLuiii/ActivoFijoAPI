import { SignupForm } from "@/components/signup-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

export const NewUsers = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link to="/employees" replace>
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Volver</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Nuevo Usuario</h1>
                    <p className="text-muted-foreground">Crear un nuevo usuario para el sistema</p>
                </div>
            </div>
            <div className="xs:w-full w-2xl">
                <SignupForm />
            </div>
        </div>
    )
}

