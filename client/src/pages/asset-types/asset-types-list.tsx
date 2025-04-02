import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, PlusCircle, ShieldCheck, ShieldMinus } from "lucide-react"
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
import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { useDeleteAssetTypesMutation, useGetAllAssetTypesQuery } from "@/features/asset-types/assetTypesApiSlice"
import { UILoading } from "@/components/ui-loading"
import { UIError } from "@/components/ui-error"
import { Pagination } from "@/components/pagination"

export const AssetTypesList = () => {

    const { data = [], isLoading, isFetching, isError, refetch } = useGetAllAssetTypesQuery(undefined,
        {
            refetchOnMountOrArgChange: true
        }
    );
    const [deleteAssetType, { isLoading: isDeleting }] = useDeleteAssetTypesMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteAssetType(id).unwrap();
            refetch();
        } catch (error) {
            console.error("Error eliminando tipo de activo", error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Tipos de Activos</h1>
                <Button asChild>
                    <Link to="/asset-types/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Tipo de Activo
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Tipos de Activos</CardTitle>
                    <CardDescription>Lista de tipos de activos registrados</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading || isFetching ? (
                        <UILoading variant="skeleton" count={5} />
                    ) : isError ? (
                        <UIError onRetry={refetch} />
                    ) : (
                        <Table className="table-auto w-auto max-w-full min-w-3xl">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead className="hidden md:table-cell">Descripción</TableHead>
                                    <TableHead className="hidden md:table-cell">Cuenta de Compra</TableHead>
                                    <TableHead className="hidden md:table-cell">Cuenta de Depreciación</TableHead>
                                    <TableHead className="text-center">Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <Pagination
                                    data={data}
                                    pageSize={5}
                                    renderItem={(type) => (
                                        <TableRow key={type.id}>
                                            <TableCell>{type.id}</TableCell>
                                            <TableCell>{type.descripcion}</TableCell>
                                            <TableCell>{type.cuentaContableCompra}</TableCell>
                                            <TableCell>{type.cuentaContableDepreciacion}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={type.activo ? "default" : "destructive"}>
                                                    {type.activo ? "Activo" : "Inactivo"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link to={`/asset-types/${type.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" disabled={isDeleting}>
                                                            {type.activo ? <ShieldMinus className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Esto {type.activo ? 'desactivará' : 'activará'} el tipo de activo.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(type.id)} disabled={isDeleting}>
                                                                {isDeleting ? 'En proceso...' : type.activo ? 'Desactivar' : 'Activar'}
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    )} />
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </>
    )
}
