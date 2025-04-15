import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router";
import { useLoginMutation } from "@/features/authentication/authenticationApiSlice";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [login, { isLoading }] = useLoginMutation()

    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            identifier: "",
            password: "",
            rememberMe: false,
        },
    });


    //josePerez@@11
    //josePerez@gmail.com
    async function onSubmit(data: { identifier: string; password: string; }) {
        // setIsLoading(true);

        try {
            const response = await login({ email: data.identifier, password: data.password }).unwrap();

            localStorage.setItem("token", response.token);
            localStorage.setItem("tokenServices", response.tokenServicioExterno);
            localStorage.setItem("email", response.email);

            toast({
                title: "Inicio de sesión exitoso",
                description: "Bienvenido al sistema de gestión de activos",
                variant: "default"
            });

            navigate("/");
        } catch (error) {
            console.error(error);
            toast({
                title: "Error de autenticación",
                description: "Credenciales incorrectas. Por favor intente nuevamente.",
                variant: "destructive",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormItem>
                    <FormLabel>Usuario o Email</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Ingrese su usuario o email"
                            {...form.register("identifier", { required: "Este campo es obligatorio" })}
                            disabled={isLoading}
                            autoComplete="username"
                        />
                    </FormControl>
                    <FormMessage>{form.formState.errors.identifier?.message}</FormMessage>
                </FormItem>

                <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Ingrese su contraseña"
                                {...form.register("password", { required: "Este campo es obligatorio" })}
                                disabled={isLoading}
                                autoComplete="current-password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                </FormItem>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="rememberMe" {...form.register("rememberMe")} disabled={isLoading} />
                        <label htmlFor="rememberMe" className="text-sm font-medium leading-none">
                            Recordarme
                        </label>
                    </div>

                    <Button variant="link" className="px-0 font-normal" disabled={isLoading}>
                        ¿Olvidó su contraseña?
                    </Button>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Iniciar Sesión
                </Button>
            </form>
        </Form>
    );
}
