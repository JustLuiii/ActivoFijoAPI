import { AssetTypeForm } from "@/components/asset-type-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useParams } from "react-router"
import { Link } from "react-router"

export const EditAssetType = () => {

    const { id } = useParams<{ id: string }>();

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
                    <h1 className="text-3xl font-bold tracking-tight">Editar Tipo de Activo</h1>
                    <p className="text-muted-foreground">Modificar información del tipo de activo #{id}</p>
                </div>
            </div>
            <div className="xs:w-full w-2xl">
                <AssetTypeForm id={id} />
            </div>
        </div>
    )
}

