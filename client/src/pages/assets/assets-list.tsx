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
import { useDeleteAssetsMutation, useGetAllAssetsQuery } from "@/features/assets/assetsApiSlice"
import { UILoading } from "@/components/ui-loading"
import { UIError } from "@/components/ui-error"
import { FormatCurrency } from "@/utils/format-currency"
import { FormatDate } from "@/utils/format-date"
import { Pagination } from "@/components/pagination"
import { AssetFilterComponent, FormValuesFilter } from "@/components/asset-filter-form"
import { useState } from "react";

export const AssetsList = () => {

    const { data = [], isLoading, isFetching, isError, refetch } = useGetAllAssetsQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    const [deleteAsset, { isLoading: isDeleting }] = useDeleteAssetsMutation();
    const [filterData, setFilterData] = useState<Partial<FormValuesFilter>>({});

    const handleDelete = async (id: number) => {
        try {
            await deleteAsset(id).unwrap();
            refetch();
        } catch (error) {
            console.error("Error eliminando activo", error);
        }
    };

    const handleFilter = (data: Partial<FormValuesFilter>) => {
        setFilterData(data);
    };

    const applyFilter = () => {
        const { tipoActivoId, departamentoId, fechaInicio, fechaFin, descripcion } = filterData;
        const shouldFilter = tipoActivoId || departamentoId || fechaInicio || fechaFin || descripcion;

        return shouldFilter ? data.filter(asset =>
            (!descripcion || asset.descripcion.includes(descripcion.trim())) &&
            (!tipoActivoId || asset.tipoActivoId === Number(tipoActivoId)) &&
            (!departamentoId || asset.departamentoId === Number(departamentoId)) &&
            (!fechaInicio || new Date(asset.fechaAdquisicion) >= new Date(fechaInicio)) &&
            (!fechaFin || new Date(asset.fechaAdquisicion) <= new Date(fechaFin))
        ) : data;
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Activos</h1>
                <Button asChild>
                    <Link to="/assets/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Activo
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Activos Fijos</CardTitle>
                    <CardDescription>Lista de activos fijos registrados</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="my-2">
                        <AssetFilterComponent onReset={() => setFilterData({})} onFilter={handleFilter} />
                    </div>
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
                                    <TableHead className="hidden md:table-cell">Depreciación Acumulada</TableHead>
                                    <TableHead className="hidden md:table-cell">Fecha Adquisición</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead>Tipo de Activo</TableHead>
                                    <TableHead>Departamento</TableHead>
                                    <TableHead className="text-center">Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <Pagination
                                    data={applyFilter()}
                                    pageSize={5}
                                    renderItem={(asset) => (
                                        <TableRow key={asset.id}>
                                            <TableCell>{asset.id}</TableCell>
                                            <TableCell className="font-medium">{asset.descripcion}</TableCell>
                                            <TableCell className="hidden md:table-cell">{FormatCurrency({ value: asset.depreciacionAcumulada })}</TableCell>
                                            <TableCell className="hidden md:table-cell">{FormatDate(asset.fechaAdquisicion)}</TableCell>
                                            <TableCell className="hidden md:table-cell">{FormatCurrency({ value: asset.valor })}</TableCell>
                                            <TableCell className="hidden md:table-cell">{asset.tipoActivo}</TableCell>
                                            <TableCell className="hidden md:table-cell">{asset.departamento}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={asset.estado == 1 ? "default" : asset.estado == 2 ? "outline" : asset.estado == 3 ? "secondary" : "destructive"}>
                                                    {asset.estado == 1 ? "Operativo" : asset.estado == 2 ? "En Mantenimiento" : asset.estado == 3 ? "Baja" : "Inactivo"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link to={`/assets/${asset.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" disabled={isDeleting}>
                                                            {asset.estado ? <ShieldMinus className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Esto {asset.estado ? 'desactivará' : 'activará'} el activo fijo.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(asset.id)} disabled={isDeleting}>
                                                                {isDeleting ? 'En proceso...' : asset.estado ? 'Desactivar' : 'Activar'}
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
