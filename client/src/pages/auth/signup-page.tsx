import { SignupForm } from "@/components/signup-form";
import { Link } from "react-router";

export default function SignupPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Crear Cuenta</h2>
                <p className="text-sm text-muted-foreground">Complete el formulario para registrarse en el sistema</p>
            </div>
            <SignupForm />
            <div className="text-center text-sm">
                ¿Ya tiene una cuenta?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    )
}