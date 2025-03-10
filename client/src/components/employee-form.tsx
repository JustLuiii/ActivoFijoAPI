import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const employeeData = {
    "1": {
        id: 1,
        nombre: "Juan Pérez",
        cedula: "001-2345678-9",
        departamento: "Recursos Humanos",
        tipo_persona: 1, // Físico
        fecha_ingreso: "2020-01-15",
        activo: true
    }
}

type EmployeeFormProps = {
    id?: string
}

export const EmployeeForm = ({ id }: EmployeeFormProps) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nombre: "",
        cedula: "",
        departamento: "",
        tipo_persona: 1, // Físico por defecto
        fecha_ingreso: "",
        activo: true
    })

    useEffect(() => {
        if (id && employeeData[id as keyof typeof employeeData]) {
            const employee = employeeData[id as keyof typeof employeeData]
            setFormData({
                nombre: employee.nombre,
                cedula: employee.cedula,
                departamento: employee.departamento,
                tipo_persona: employee.tipo_persona,
                fecha_ingreso: employee.fecha_ingreso,
                activo: employee.activo
            })
        }
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log("Form submitted:", formData)
        // Aquí normalmente enviarías los datos a tu backend

        navigate("/employees")
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Información del Empleado</CardTitle>
                    <CardDescription>Complete la información requerida para el empleado</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre del empleado"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cedula">Cédula</Label>
                        <Input
                            id="cedula"
                            name="cedula"
                            placeholder="Cédula del empleado"
                            value={formData.cedula}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="departamento">Departamento</Label>
                        <Input
                            id="departamento"
                            name="departamento"
                            placeholder="Departamento"
                            value={formData.departamento}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tipo_persona">Tipo de Persona</Label>
                        <Select
                            name="tipo_persona"
                            value={formData.tipo_persona.toString()}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, tipo_persona: parseInt(value) }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo de persona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Física</SelectItem>
                                <SelectItem value="2">Jurídica</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fecha_ingreso">Fecha de Ingreso</Label>
                        <Input
                            id="fecha_ingreso"
                            name="fecha_ingreso"
                            type="date"
                            value={formData.fecha_ingreso}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="activo">Estado</Label>
                        <Select
                            name="activo"
                            value={formData.activo ? "1" : "0"}
                            onValueChange={(value: string) => setFormData((prev) => ({ ...prev, activo: value === "1" }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Activo</SelectItem>
                                <SelectItem value="0">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => navigate("/employees", { replace: true })}>
                        Cancelar
                    </Button>
                    <Button type="submit">{id ? "Actualizar" : "Crear"} Empleado</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
