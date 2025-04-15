import { Outlet } from "react-router"
import { Package } from "lucide-react"
import { PublicRoute } from "@/components/public-route"


export const AuthLayout = () => {

    return (
        <PublicRoute>
            <div className="min-h-screen grid md:grid-cols-2 bg-muted/40">
                <div className="flex items-center justify-center p-4 md:p-8">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="flex items-center justify-center p-2 rounded-full bg-primary/10">
                                <Package className="h-10 w-10 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold">Activos Fijos</h1>
                            <p className="text-muted-foreground">Sistema de gestión de activos fijos</p>
                        </div>
                        <Outlet />
                    </div>
                </div>

                <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                    <div className="relative w-full max-w-lg aspect-square">
                        <Package className="h-100 w-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex flex-col justify-end p-8">
                            <h2 className="text-2xl font-bold text-white">Gestión de Activos Simplificada</h2>
                            <p className="text-white/80 mt-2">
                                Controle, rastree y administre todos los activos de su organización en un solo lugar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicRoute>
    )
}

