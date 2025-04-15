import { Pagination } from "@/components/pagination"
import { UIError } from "@/components/ui-error"
import { UILoading } from "@/components/ui-loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDeleteUsersMutation, useGetAllUsersQuery } from "@/features/users/usersApiSlice"
import { Edit, PlusCircle, Trash } from "lucide-react"
import { Link } from "react-router"

export const UsersList = () => {

    const [deleteEmployee, { isLoading: isDeleting }] = useDeleteUsersMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteEmployee(id).unwrap();
            refetch();
        } catch (error) {
            console.error("Error eliminando usuario", error);
        }
    };

    const { data, isLoading, isFetching, isError, refetch } = useGetAllUsersQuery(undefined, {
        refetchOnMountOrArgChange: true
    });


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
                <CardContent>
                    {isLoading || isFetching || isDeleting ? (
                        <UILoading variant="skeleton" count={5} />
                    ) : isError ? (
                        <UIError onRetry={refetch} />
                    ) : (
                        <Table className="table-auto w-auto max-w-full min-w-3xl">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden md:table-cell">ID</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead className="hidden md:table-cell">Email</TableHead>
                                    <TableHead className="hidden md:table-cell">Sistema</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <Pagination
                                    data={data || []}
                                    pageSize={5}
                                    renderItem={(user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="hidden md:table-cell">{user.id}</TableCell>
                                            <TableCell className="font-medium">{user.nombre}</TableCell>
                                            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                                            <TableCell className="hidden md:table-cell">activo fijo</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link to={`/users/${user.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                            <span className="sr-only">Editar</span>
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)} disabled={isDeleting}>
                                                        <Trash className="h-4 w-4" />
                                                        <span className="sr-only">{isDeleting ? 'Eliminando...' : 'Eliminar'}</span>
                                                    </Button>
                                                </div>
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
