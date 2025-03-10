import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

// Datos simulados para los tipos de activos y departamentos
const assetTypeData = {
    "1": { id: 1, descripcion: "Computadora" },
    "2": { id: 2, descripcion: "Mobiliario" },
}

const departmentData = {
    "1": { id: 1, descripcion: "Administración" },
    "2": { id: 2, descripcion: "TI" },
}

const AssetData = {
    "1": {
        id: 1,
        descripcion: "Computadora de Oficina",
        departamento_id: 2,
        tipo_activo_id: 1,
        fecha_adquisicion: "2023-03-01",
        valor: 1200.00,
        depreciacion_acumulada: 300.00,
        estado: 1,
    }
}

type AssetFormProps = {
    id?: string
}

export const AssetForm = ({ id }: AssetFormProps) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        descripcion: "",
        departamento_id: "",
        tipo_activo_id: "",
        fecha_adquisicion: "",
        valor: "",
        depreciacion_acumulada: "",
        estado: 1,
    })

    useEffect(() => {
        if (id && AssetData[id as keyof typeof AssetData]) {
            const asset = AssetData[id as keyof typeof AssetData]
            setFormData({
                descripcion: asset.descripcion,
                departamento_id: asset.departamento_id.toString(),
                tipo_activo_id: asset.tipo_activo_id.toString(),
                fecha_adquisicion: asset.fecha_adquisicion,
                valor: asset.valor.toString(),
                depreciacion_acumulada: asset.depreciacion_acumulada.toString(),
                estado: asset.estado,
            })
        }
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log("Form submitted:", formData)
        // Aquí normalmente enviarías los datos a tu backend

        navigate("/-assets")
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Información del Activo Fijo</CardTitle>
                    <CardDescription>Complete la información requerida para el activo fijo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Input
                            id="descripcion"
                            name="descripcion"
                            placeholder="Descripción del activo fijo"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="departamento_id">Departamento</Label>
                        <Select
                            name="departamento_id"
                            value={formData.departamento_id}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, departamento_id: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione departamento" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(departmentData).map((department) => (
                                    <SelectItem key={department.id} value={department.id.toString()}>
                                        {department.descripcion}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tipo_activo_id">Tipo de Activo</Label>
                        <Select
                            name="tipo_activo_id"
                            value={formData.tipo_activo_id}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, tipo_activo_id: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo de activo" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(assetTypeData).map((assetType) => (
                                    <SelectItem key={assetType.id} value={assetType.id.toString()}>
                                        {assetType.descripcion}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fecha_adquisicion">Fecha de Adquisición</Label>
                        <Input
                            type="date"
                            id="fecha_adquisicion"
                            name="fecha_adquisicion"
                            value={formData.fecha_adquisicion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="valor">Valor</Label>
                        <Input
                            type="number"
                            step="0.01"
                            id="valor"
                            name="valor"
                            placeholder="Valor del activo"
                            value={formData.valor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="depreciacion_acumulada">Depreciación Acumulada</Label>
                        <Input
                            type="number"
                            step="0.01"
                            id="depreciacion_acumulada"
                            name="depreciacion_acumulada"
                            placeholder="Depreciación acumulada"
                            value={formData.depreciacion_acumulada}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Select
                            name="estado"
                            value={formData.estado.toString()}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, estado: parseInt(value) }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Operativo</SelectItem>
                                <SelectItem value="2">En Mantenimiento</SelectItem>
                                <SelectItem value="3">Baja</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => navigate("/-assets", { replace: true })}>
                        Cancelar
                    </Button>
                    <Button type="submit">{id ? "Actualizar" : "Crear"} Activo Fijo</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
