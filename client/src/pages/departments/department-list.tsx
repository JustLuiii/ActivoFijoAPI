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

// Mock data
const departments = [
    { id: 1, description: "Gestión de personal", activo: true },
    { id: 2, description: "Contabilidad y finanzas", activo: true },
    { id: 3, description: "Soporte técnico e infraestructura", activo: false },
    { id: 4, description: "Publicidad y relaciones públicas", activo: true },
    { id: 5, description: "Logística y operaciones", activo: true },
]

export const DepartmentList = () => {
    const [departmentsList, setDepartmentsList] = useState(departments)

    const handleDelete = (id: number) => {
        setDepartmentsList(departmentsList.filter((dept) => dept.id !== id))
    }

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
                    <Table className="table-auto w-auto max-w-full min-w-3xl">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                {/* <TableHead>Nombre</TableHead> */}
                                <TableHead className="hidden md:table-cell">Descripción</TableHead>
                                <TableHead className="text-center">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {departmentsList.map((department) => (
                                <TableRow key={department.id}>
                                    <TableCell>{department.id}</TableCell>
                                    {/* <TableCell className="font-medium">{department.name}</TableCell> */}
                                    <TableCell className="hidden md:table-cell">{department.description}</TableCell>
                                    {/* <TableCell>{department.employees}</TableCell> */}
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
                                                            Esta acción no se puede deshacer. Esto eliminará permanentemente el departamento y todos los
                                                            datos asociados.
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
                </CardContent>
            </Card>
        </>
    )
}

