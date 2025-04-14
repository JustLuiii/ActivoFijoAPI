"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UIError } from "@/components/ui-error";
import { UILoading } from "@/components/ui-loading";
import type { User } from "@/features/users/usersTypes";
import { useCreateUsersMutation, useLazyGetByIdUsersQuery, useUpdateUsersMutation } from "@/features/users/usersApiSlice";

interface UserFormProps {
    id?: string;
}

export const UserForm = ({ id }: UserFormProps) => {
    const navigate = useNavigate();
    const userId = Number(id);

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        reset,
        formState: { errors },
    } = useForm<User>({
        defaultValues: {
            id: 0,
            nombre: "",
            email: "",
        },
    });

    const [fetchUser, { isFetching }] = useLazyGetByIdUsersQuery();
    const [createUser, { isError: isCreateError }] = useCreateUsersMutation();
    const [updateUser, { isError: isUpdateError }] = useUpdateUsersMutation();

    useEffect(() => {
        if (id) {
            fetchUser(userId)
                .unwrap()
                .then((data) => {
                    setValue("id", data.id);
                    setValue("nombre", data.nombre);
                    setValue("email", data.email);
                });
        }
    }, [id, reset]);

    if (isFetching) return <UILoading variant="spinner" />;

    const onSubmit = async (data: Partial<User>) => {
        try {
            if (id) {
                await updateUser({ id: userId, ...data }).unwrap();
            } else {
                await createUser({ email: data.email, idSistemaAuxiliar: 8, nombre: data.nombre, password: '123456' }).unwrap();
            }
            navigate("/users");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.status === 400) {
                setError("email", { type: "manual", message: "El correo electrónico ya está en uso" });
            }
            console.error("Error al guardar el usuario", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>{id ? "Editar Usuario" : "Crear Usuario"}</CardTitle>
                    <CardDescription>
                        Complete la información requerida del usuario.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input
                            id="nombre"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                            placeholder="Nombre del usuario"
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Correo inválido",
                                },
                            })}
                            placeholder="ejemplo@correo.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                </CardContent>

                {(isCreateError || isUpdateError) && (
                    <CardContent>
                        <UIError
                            title="Error"
                            description="No se pudo guardar el usuario."
                            variant="alert"
                        />
                    </CardContent>
                )}

                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => navigate("/users", { replace: true })}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit">{id ? "Actualizar" : "Crear"} Usuario</Button>
                </CardFooter>
            </Card>
        </form>
    );
};
