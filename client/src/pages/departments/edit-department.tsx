import { DepartmentForm } from "@/components/department-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useParams } from "react-router"
import { Link } from "react-router"

export const EditDepartment = () => {

    const { id } = useParams<{ id: string }>();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link to="/departments" replace>
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Volver</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Editar Departamento</h1>
                    <p className="text-muted-foreground">Modificar información del departamento #{id}</p>
                </div>
            </div>
            <div className="xs:w-full w-2xl">
                <DepartmentForm id={id} />
            </div>
        </div>
    )
}

