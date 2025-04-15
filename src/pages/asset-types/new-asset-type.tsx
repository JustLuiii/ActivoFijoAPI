import { AssetTypeForm } from "@/components/asset-type-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

export const NewAssetType = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link to="/asset-types" replace>
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Volver</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Nuevo Tipo de Activo</h1>
                    <p className="text-muted-foreground">Crear un nuevo tipo de activo en el sistema</p>
                </div>
            </div>
            <div className="xs:w-full w-2xl">
                <AssetTypeForm />
            </div>
        </div>
    )
}

