import { AssetForm } from "@/components/asset-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

export const NewAsset = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link to="/assets" replace>
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Volver</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Nuevo Activo Fijo</h1>
                    <p className="text-muted-foreground">Crear un nuevo activo fijo en el sistema</p>
                </div>
            </div>
            <div className="xs:w-full w-2xl">
                <AssetForm />
            </div>
        </div>
    )
}

