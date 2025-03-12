import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PasswordStrengthIndicator } from "@/components/password-strength-indicator";
import { useNavigate } from "react-router";

export function SignupForm() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const password = form.watch("password");

    interface FormData {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    async function onSubmit(data: FormData) {
        if (data.password !== data.confirmPassword) {
            form.setError("confirmPassword", { type: "manual", message: "Las contraseñas no coinciden" });
            return;
        }
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast({ title: "Registro exitoso", description: "Su cuenta ha sido creada correctamente", variant: "default" });
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast({ title: "Error de registro", description: "No se pudo crear la cuenta. Por favor intente nuevamente.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="username" rules={{
                    required: "El nombre de usuario es obligatorio",
                    minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                    maxLength: { value: 20, message: "No puede exceder los 20 caracteres" },
                    pattern: { value: /^[a-zA-Z0-9_]+$/, message: "Solo se permiten letras, números y guiones bajos" }
                }} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre de Usuario</FormLabel>
                        <FormControl>
                            <Input placeholder="Ingrese un nombre de usuario" {...field} disabled={isLoading} autoComplete="username" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="email" rules={{
                    required: "El email es requerido",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de email inválido" }
                }} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="Ingrese su email" {...field} disabled={isLoading} autoComplete="email" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="password" rules={{
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
                    validate: {
                        hasUpperCase: (value) => /[A-Z]/.test(value) || "Debe contener al menos una letra mayúscula",
                        hasLowerCase: (value) => /[a-z]/.test(value) || "Debe contener al menos una letra minúscula",
                        hasNumber: (value) => /[0-9]/.test(value) || "Debe contener al menos un número",
                        hasSpecialChar: (value) => /[^A-Za-z0-9]/.test(value) || "Debe contener al menos un carácter especial"
                    }
                }} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input type={showPassword ? "text" : "password"} placeholder="Ingrese una contraseña" {...field} disabled={isLoading} autoComplete="new-password" />
                                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </FormControl>
                        <PasswordStrengthIndicator password={password} />
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="confirmPassword" rules={{
                    required: "Confirme su contraseña"
                }} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirmar Contraseña</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirme su contraseña" {...field} disabled={isLoading} autoComplete="new-password" />
                                <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}>
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Crear Cuenta
                </Button>
            </form>
        </Form>
    );
}
