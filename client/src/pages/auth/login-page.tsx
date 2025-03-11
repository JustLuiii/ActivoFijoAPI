import { LoginForm } from "@/components/login-form";
import { Link } from "react-router";

export default function LoginPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
                <p className="text-sm text-muted-foreground">Ingrese sus credenciales para acceder al sistema</p>
            </div>
            <LoginForm />
            <div className="text-center text-sm">
                ¿No tiene una cuenta?{" "}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                    Registrarse
                </Link>
            </div>
        </div>
    )
}