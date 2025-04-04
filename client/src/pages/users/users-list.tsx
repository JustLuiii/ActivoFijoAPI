import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, PlusCircle, ShieldCheck, ShieldMinus } from "lucide-react"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
import { Link } from "react-router"
// import { Badge } from "@/components/ui/badge"
// import { useDeleteEmployeesMutation, useGetAllEmployeesQuery } from "@/features/employees/employeesApiSlice"
// import { UILoading } from "@/components/ui-loading"
// import { UIError } from "@/components/ui-error"
// import { Pagination } from "@/components/pagination"

export const UsersList = () => {

    // const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeesMutation();

    // const handleDelete = async (id: number) => {
    //     try {
    //         await deleteEmployee(id).unwrap();
    //         refetch();
    //     } catch (error) {
    //         console.error("Error eliminando departamento", error);
    //     }
    // };


    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
                    <p className="text-muted-foreground">Gestione los usuarios de la organización</p>
                </div>
                <Button asChild>
                    <Link to="/users/new" replace>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Usuario
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Usuarios</CardTitle>
                    <CardDescription>Lista de usuarios registrados en el sistema</CardDescription>
                </CardHeader>
                {/* <CardContent>
                    {isLoading || isFetching ? (
                        <UILoading variant="skeleton" count={5} />
                    ) : isError ? (
                        <UIError onRetry={refetch} />
                    ) : (
                        <Table className="table-auto w-auto max-w-full min-w-3xl">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead className="hidden md:table-cell">Cédula</TableHead>
                                    <TableHead className="hidden md:table-cell">Departamento</TableHead>
                                    <TableHead className="hidden md:table-cell">Tipo Persona</TableHead>
                                    <TableHead className="text-center">Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <Pagination
                                    data={data}
                                    pageSize={5}
                                    renderItem={(employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell>{employee.id}</TableCell>
                                            <TableCell className="font-medium">{employee.nombre}</TableCell>
                                            <TableCell className="hidden md:table-cell">{employee.cedula}</TableCell>
                                            <TableCell className="hidden md:table-cell">{employee.departamento.descripcion}</TableCell>
                                            <TableCell className="hidden md:table-cell">{employee.tipoPersona == 1 ? 'Física' : 'Jurídica'}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={employee.activo ? "default" : "destructive"}>
                                                    {employee.activo ? "Activo" : "Inactivo"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link to={`/employees/${employee.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                            <span className="sr-only">Editar</span>
                                                        </Link>
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                {employee.activo ? <ShieldMinus className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                                                                <span className="sr-only">{employee.activo ? 'Desactivar' : 'Activar'} </span>
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Esto {employee.activo ? 'inhabilitara' : 'habilitara'} permanentemente al empleado y todos los
                                                                    datos asociados.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(employee.id)}>
                                                                    {isDeleting ? 'Enviado...' : employee.activo ? 'Desactivar' : 'Activar'}
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )} />
                            </TableBody>
                        </Table>
                    )}
                </CardContent> */}
            </Card>
        </>
    )
}
