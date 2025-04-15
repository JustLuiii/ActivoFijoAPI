import { AccountantForm } from "@/components/accountant-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useParams } from "react-router"
import { Link } from "react-router"

export const EditAccountant = () => {

    const { id } = useParams<{ id: string }>();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link to="/accountant-entrys" replace>
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Volver</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Editar Cuenta Contable</h1>
                    <p className="text-muted-foreground">Modificar información de la cuenta contable #{id}</p>
                </div>
            </div>
            <div className="xs:w-full w-2xl">
                <AccountantForm id={id} />
            </div>
        </div>
    )
}

