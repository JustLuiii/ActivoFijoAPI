import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, PlusCircle, Trash2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"

// Ejemplo de datos simulados para tipo de activo
const assetTypes = [
    {
        id: 1,
        descripcion: "Computadora",
        cuenta_contable_compra: "101-001",
        cuenta_contable_depreciacion: "301-001",
        activo: true,
    }
]

export const AssetTypesList = () => {
    const [assetTypesList, setAssetTypesList] = useState(assetTypes)

    const handleDelete = (id: number) => {
        setAssetTypesList(assetTypesList.filter((asset) => asset.id !== id))
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tipos de Activo</h1>
                    <p className="text-muted-foreground">Gestione los tipos de activo de la organización</p>
                </div>
                <Button asChild>
                    <Link to="/asset-types/new" replace>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Tipo de Activo
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Tipos de Activo</CardTitle>
                    <CardDescription>Lista de tipos de activo registrados en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table className="table-auto w-auto max-w-full min-w-3xl">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead className="hidden md:table-cell">Cuenta Compra</TableHead>
                                <TableHead className="hidden md:table-cell">Cuenta Depreciación</TableHead>
                                <TableHead className="text-center">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assetTypesList.map((asset) => (
                                <TableRow key={asset.id}>
                                    <TableCell>{asset.id}</TableCell>
                                    <TableCell className="font-medium">{asset.descripcion}</TableCell>
                                    <TableCell className="hidden md:table-cell">{asset.cuenta_contable_compra}</TableCell>
                                    <TableCell className="hidden md:table-cell">{asset.cuenta_contable_depreciacion}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={asset.activo ? "default" : "destructive"}>
                                            {asset.activo ? "Activo" : "Inactivo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link to={`/asset-types/${asset.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Editar</span>
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Eliminar</span>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Esta acción no se puede deshacer. Esto eliminará permanentemente el tipo de activo.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(asset.id)}>Eliminar</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
