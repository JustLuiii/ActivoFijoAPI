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

// Este es un ejemplo con algunos datos simulados para empleados
const employees = [
    {
        id: 1,
        nombre: "Juan Pérez",
        cedula: "001-2345678-9",
        departamento: "Recursos Humanos",
        tipo_persona: 1, // Físico
        fecha_ingreso: "2020-01-15",
        activo: true,
    }
]

export const EmployeesList = () => {
    const [employeesList, setEmployeesList] = useState(employees)

    const handleDelete = (id: number) => {
        setEmployeesList(employeesList.filter((employee) => employee.id !== id))
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
                    <p className="text-muted-foreground">Gestione los empleados de la organización</p>
                </div>
                <Button asChild>
                    <Link to="/employees/new" replace>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Empleado
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Empleados</CardTitle>
                    <CardDescription>Lista de empleados registrados en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table className="table-auto w-auto max-w-full min-w-3xl">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead className="hidden md:table-cell">Cédula</TableHead>
                                <TableHead className="hidden md:table-cell">Departamento</TableHead>
                                <TableHead className="text-center">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employeesList.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.id}</TableCell>
                                    <TableCell className="font-medium">{employee.nombre}</TableCell>
                                    <TableCell className="hidden md:table-cell">{employee.cedula}</TableCell>
                                    <TableCell className="hidden md:table-cell">{employee.departamento}</TableCell>
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
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Eliminar</span>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Esta acción no se puede deshacer. Esto eliminará permanentemente al empleado y todos los
                                                            datos asociados.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(employee.id)}>Eliminar</AlertDialogAction>
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
