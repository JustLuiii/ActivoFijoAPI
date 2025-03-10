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

// Ejemplo de datos simulados para activos fijos
const Assets = [
    {
        id: 1,
        descripcion: "Computadora de Oficina",
        departamento_id: 2,
        tipo_activo_id: 1,
        fecha_adquisicion: "2023-03-01",
        valor: 1200.00,
        depreciacion_acumulada: 300.00,
        estado: 1,
    }
]

export const AssetsList = () => {
    const [AssetsList, setAssetsList] = useState(Assets)

    const handleDelete = (id: number) => {
        setAssetsList(AssetsList.filter((asset) => asset.id !== id))
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Activos Fijos</h1>
                    <p className="text-muted-foreground">Gestione los activos fijos de la organización</p>
                </div>
                <Button asChild>
                    <Link to="/-assets/new" replace>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Activo Fijo
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Activos Fijos</CardTitle>
                    <CardDescription>Lista de activos fijos registrados en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table className="table-auto w-auto max-w-full min-w-3xl">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead className="hidden md:table-cell">Fecha Adquisición</TableHead>
                                <TableHead className="hidden md:table-cell">Valor</TableHead>
                                <TableHead className="hidden md:table-cell">Depreciación Acumulada</TableHead>
                                <TableHead className="text-center">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {AssetsList.map((asset) => (
                                <TableRow key={asset.id}>
                                    <TableCell>{asset.id}</TableCell>
                                    <TableCell className="font-medium">{asset.descripcion}</TableCell>
                                    <TableCell className="hidden md:table-cell">{asset.fecha_adquisicion}</TableCell>
                                    <TableCell className="hidden md:table-cell">{asset.valor}</TableCell>
                                    <TableCell className="hidden md:table-cell">{asset.depreciacion_acumulada}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={asset.estado === 1 ? "default" : asset.estado === 2 ? "secondary" : "destructive"}>
                                            {asset.estado === 1 ? "Operativo" : asset.estado === 2 ? "En Mantenimiento" : "Baja"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link to={`/-assets/${asset.id}/edit`}>
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
                                                            Esta acción no se puede deshacer. Esto eliminará permanentemente el activo fijo.
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
