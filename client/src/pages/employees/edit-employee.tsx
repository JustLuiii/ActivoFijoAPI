import { EmployeeForm } from "@/components/employee-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useParams } from "react-router"
import { Link } from "react-router"

export const EditEmployee = () => {

    const { id } = useParams<{ id: string }>();

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
                    <h1 className="text-3xl font-bold tracking-tight">Editar Empleado</h1>
                    <p className="text-muted-foreground">Modificar información del empleado #{id}</p>
                </div>
            </div>
            <div className="xs:w-full w-2xl">
                <EmployeeForm id={id} />
            </div>
        </div>
    )
}

