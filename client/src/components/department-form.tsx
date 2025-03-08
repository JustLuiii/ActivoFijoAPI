"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

// Mock data for edit
const departmentData = {
    "1": { id: 1, description: "Gestión de personal" },
    "2": { id: 2, description: "Contabilidad y finanzas" },
    "3": { id: 3, description: "Soporte técnico e infraestructura" },
    "4": { id: 4, description: "Publicidad y relaciones públicas" },
    "5": { id: 5, description: "Logística y operaciones" },
}

type DepartmentFormProps = {
    id?: string
}

export function DepartmentForm({ id }: DepartmentFormProps) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        description: "",
    })

    useEffect(() => {
        if (id && departmentData[id as keyof typeof departmentData]) {
            const dept = departmentData[id as keyof typeof departmentData]
            setFormData({
                description: dept.description,
            })
        }
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log("Form submitted:", formData)
        // Here you would typically save the data to your backend

        navigate("/departments")
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Información del Departamento</CardTitle>
                    <CardDescription>Complete la información requerida para el departamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Nombre del departamento"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div> */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="descripcion"
                            name="descripcion"
                            placeholder="Descripción del departamento"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => navigate("/departments", { replace: true })}>
                        Cancelar
                    </Button>
                    <Button type="submit">{id ? "Actualizar" : "Crear"} Departamento</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

