import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { IAssetTypes } from "@/features/asset-types/assetTypesTypes"
import { useCreateAssetTypesMutation, useLazyGetByIdAssetTypesQuery, useUpdateAssetTypesMutation } from "@/features/asset-types/assetTypesApiSlice"
import { UILoading } from "./ui-loading"
import { UIError } from "./ui-error"

type AssetTypeFormProps = {
    id?: string
}

export const AssetTypeForm = ({ id }: AssetTypeFormProps) => {

    const navigate = useNavigate();
    const employeeId = Number(id);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IAssetTypes>({
        defaultValues: {
            cuentaContableCompra: "",
            cuentaContableDepreciacion: "",
            descripcion: "",
            activo: true
        }
    });

    const [fetchAssetTypes, { isFetching, isError }] = useLazyGetByIdAssetTypesQuery();

    useEffect(() => {
        if (id) {
            fetchAssetTypes(parseInt(id))
                .unwrap()
                .then((data) => {
                    setValue('cuentaContableCompra', data.cuentaContableCompra);
                    setValue('cuentaContableDepreciacion', data.cuentaContableDepreciacion);
                    setValue('id', data.id);
                    setValue('activo', data.activo);
                    setValue('descripcion', data.descripcion);
                });
        }
    }, [id]);

    const [createAssetTypes, { isError: isCreateError }] = useCreateAssetTypesMutation();
    const [updateAssetTypes, { isError: isUpdateError }] = useUpdateAssetTypesMutation();

    if (isFetching) return <UILoading variant="spinner" />;

    const onSubmit = async (data: Partial<IAssetTypes>) => {

        try {

            if (id) {
                await updateAssetTypes({ id: employeeId, ...data, activo: data?.activo }).unwrap();
            } else {
                await createAssetTypes({ ...data, activo: true }).unwrap();
            }

            navigate("/asset-types");
        } catch (err) {
            console.error("Error al guardar el empleado", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            placeholder="Descripción del tipo de activo"
                            {...register("descripcion", { required: "La descripción es obligatoria" })}
                        />
                        {errors.descripcion && <span className="text-red-500">{errors.descripcion.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cuentaContableCompra">Cuenta Contable de Compra</Label>
                        <Input
                            id="cuentaContableCompra"
                            placeholder="Ejemplo: 101-001"
                            {...register("cuentaContableCompra", {
                                required: "La cuenta contable es obligatoria",
                                // pattern: {
                                //     value: /^\d{3}-\d{3}$/,
                                //     message: "Formato inválido (Ejemplo: 101-001)",
                                // },
                            })}
                        />
                        {errors.cuentaContableCompra && <span className="text-red-500">{errors.cuentaContableCompra.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cuentaContableDepreciacion">Cuenta Contable de Depreciación</Label>
                        <Input
                            id="cuentaContableDepreciacion"
                            placeholder="Ejemplo: 301-001"
                            {...register("cuentaContableDepreciacion", {
                                required: "La cuenta contable de depreciación es obligatoria",
                                // pattern: {
                                //     value: /^\d{3}-\d{3}$/,
                                //     message: "Formato inválido (Ejemplo: 301-001)",
                                // },
                            })}
                        />
                        {errors.cuentaContableDepreciacion && <span className="text-red-500">{errors.cuentaContableDepreciacion.message}</span>}
                    </div>
                </CardContent>
                {(isError || isCreateError || isUpdateError) && (
                    <CardContent>
                        <UIError title="Error" description="No se pudo guardar el empleado." variant="alert" />
                    </CardContent>
                )}
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => navigate("/asset-types")}>Cancelar</Button>
                    <Button type="submit">{id ? "Actualizar" : "Crear"} Tipo de Activo</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
