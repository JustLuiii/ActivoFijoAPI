import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetAllStadisticQuery } from "@/features/stadistic/StadisticApiSlice"
import { Boxes, Building2, Package, Users } from "lucide-react"

export const DashBoardPage = () => {

    const { data } = useGetAllStadisticQuery();


    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Bienvenido al sistema de gestión de activos fijos</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.departamentos}</div>
                        <p className="text-xs text-muted-foreground">Departamentos registrados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Empleados</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.empleados}</div>
                        <p className="text-xs text-muted-foreground">Empleados registrados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tipos de Activos</CardTitle>
                        <Boxes className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.tipoActivos}</div>
                        <p className="text-xs text-muted-foreground">Categorías de activos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Activos Fijos</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.activosFijos}</div>
                        <p className="text-xs text-muted-foreground">Activos registrados</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}