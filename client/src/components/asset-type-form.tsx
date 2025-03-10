import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const assetTypeData = {
    "1": {
        id: 1,
        descripcion: "Computadora",
        cuenta_contable_compra: "101-001",
        cuenta_contable_depreciacion: "301-001",
        activo: true,
    }
}

type AssetTypeFormProps = {
    id?: string
}

export const AssetTypeForm = ({ id }: AssetTypeFormProps) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        descripcion: "",
        cuenta_contable_compra: "",
        cuenta_contable_depreciacion: "",
        activo: true,
    })

    useEffect(() => {
        if (id && assetTypeData[id as keyof typeof assetTypeData]) {
            const asset = assetTypeData[id as keyof typeof assetTypeData]
            setFormData({
                descripcion: asset.descripcion,
                cuenta_contable_compra: asset.cuenta_contable_compra,
                cuenta_contable_depreciacion: asset.cuenta_contable_depreciacion,
                activo: asset.activo,
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

        navigate("/asset-types")
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Información del Tipo de Activo</CardTitle>
                    <CardDescription>Complete la información requerida para el tipo de activo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Input
                            id="descripcion"
                            name="descripcion"
                            placeholder="Descripción del tipo de activo"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cuenta_contable_compra">Cuenta Contable de Compra</Label>
                        <Input
                            id="cuenta_contable_compra"
                            name="cuenta_contable_compra"
                            placeholder="Cuenta contable de compra"
                            value={formData.cuenta_contable_compra}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cuenta_contable_depreciacion">Cuenta Contable de Depreciación</Label>
                        <Input
                            id="cuenta_contable_depreciacion"
                            name="cuenta_contable_depreciacion"
                            placeholder="Cuenta contable de depreciación"
                            value={formData.cuenta_contable_depreciacion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="activo">Estado</Label>
                        <Select
                            name="activo"
                            value={formData.activo ? "1" : "0"}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, activo: value === "1" }))}
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
                    <Button variant="outline" type="button" onClick={() => navigate("/asset-types", { replace: true })}>
                        Cancelar
                    </Button>
                    <Button type="submit">{id ? "Actualizar" : "Crear"} Tipo de Activo</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
