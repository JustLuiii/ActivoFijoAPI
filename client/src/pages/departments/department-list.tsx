import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { useGetAllDepartmentsQuery } from "@/features/departments/departmentsApiSlice";
import { UILoading } from "@/components/ui-loading";
import { UIError } from "@/components/ui-error";

export const DepartmentList = () => {
    const { data = [], isLoading, isFetching, isError } = useGetAllDepartmentsQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    const handleDelete = (id: number) => {
        console.log(`Eliminando departamento con ID: ${id}`);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Departamentos</h1>
                    <p className="text-muted-foreground">Gestione los departamentos de la organización</p>
                </div>
                <Button asChild>
                    <Link to="/departments/new" replace>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Departamento
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Departamentos</CardTitle>
                    <CardDescription>Lista de departamentos registrados en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading || isFetching ? (
                        <UILoading variant="skeleton" count={5} />
                    ) : isError ? (
                        <UIError />
                    ) : (
                        <Table className="table-auto w-auto max-w-full min-w-3xl">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead className="hidden md:table-cell">Descripción</TableHead>
                                    <TableHead className="text-center">Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((department) => (
                                    <TableRow key={department.id}>
                                        <TableCell>{department.id}</TableCell>
                                        <TableCell className="hidden md:table-cell">{department.descripcion}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={department.activo ? "default" : "destructive"}>
                                                {department.activo ? "Activo" : "Inactivo"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link to={`/departments/${department.id}/edit`}>
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
                                                                Esta acción no se puede deshacer. Esto eliminará permanentemente el departamento y todos los datos asociados.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(department.id)}>Eliminar</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </>
    );
};
