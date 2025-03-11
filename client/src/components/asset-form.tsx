import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { IAssetsForm } from "@/features/assets/assetsTypes"
import { useForm } from "react-hook-form"
import { useGetAllDepartmentsQuery } from "@/features/departments/departmentsApiSlice"
import { useGetAllAssetTypesQuery } from "@/features/asset-types/assetTypesApiSlice"
import { useCreateAssetsMutation, useLazyGetByIdAssetsQuery, useUpdateAssetsMutation } from "@/features/assets/assetsApiSlice"
import { UILoading } from "./ui-loading"
import { UIError } from "./ui-error"

type AssetFormProps = {
    id?: string
}

export const AssetForm = ({ id }: AssetFormProps) => {

    const navigate = useNavigate()
    const assetId = Number(id);

    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm<IAssetsForm>({
        defaultValues: {
            departamentoId: "",
            tipoActivoId: "",
            fechaAdquisicion: "",
            descripcion: "",
            depreciacionAcumulada: 0,
            valor: 0,
            estado: ""
        }
    });

    const { data: departments = [], isLoading: isLoadingDepartments, isError: isDepartmentsError } = useGetAllDepartmentsQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data: assetTypes = [], isLoading: isLoadingAssetTypes, isError: isAssetTypesError } = useGetAllAssetTypesQuery(undefined, { refetchOnMountOrArgChange: true });

    const [fetchAsset, { isFetching, isError }] = useLazyGetByIdAssetsQuery();


    useEffect(() => {
        if (id) {
            fetchAsset(assetId)
                .unwrap()
                .then((data) => {
                    console.log(data);
                    setValue('departamentoId', data.departamentoId.toString());
                    setValue('tipoActivoId', data.tipoActivoId.toString());
                    setValue('fechaAdquisicion', new Date(data.fechaAdquisicion).toISOString().split('T')[0]);
                    setValue('descripcion', data.descripcion);
                    setValue('depreciacionAcumulada', data.depreciacionAcumulada);
                    setValue('valor', data.valor);
                    setValue('estado', data.estado.toString());
                });
        }
    }, [id, reset]);

    const [createAsset, { isError: isCreateError }] = useCreateAssetsMutation();
    const [updateAsset, { isError: isUpdateError }] = useUpdateAssetsMutation();

    if (isFetching) return <UILoading variant="spinner" />;

    const onSubmit = async (data: Partial<IAssetsForm>) => {

        try {

            if (id) {
                console.log(data);
                await updateAsset({ id: assetId, ...data }).unwrap();
            } else {
                await createAsset({ ...data }).unwrap();
            }

            navigate("/assets");
        } catch (err) {
            console.error("Error al guardar el empleado", err);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Información del Activo Fijo</CardTitle>
                    <CardDescription>Complete la información requerida para el activo fijo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Input id="descripcion" {...register("descripcion", { required: "El descripcion es obligatorio" })} placeholder="Descripción del activo fijo" />
                        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="departamento">Departamento</Label>
                        {isLoadingDepartments ? (
                            <UILoading variant="spinner" />
                        ) : isDepartmentsError ? (
                            <UIError title="Error" description="No se pudieron cargar los departamentos." variant="alert" />
                        ) : (
                            <Select
                                {...register("departamentoId", {
                                    required: "El departamento es obligatorio",
                                    min: {
                                        value: 1,
                                        message: "Debe seleccionar un departamento"
                                    }
                                })}
                                defaultValue={getValues("departamentoId")}
                                onValueChange={(value) => setValue("departamentoId", value, { shouldValidate: true })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione un departamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((department) => (
                                        <SelectItem key={department.id} value={department.id.toString()}>
                                            {department.descripcion}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        {errors.departamentoId && <p className="text-red-500 text-sm">{errors.departamentoId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tipoActivoId">Tipo de Activo</Label>
                        {isLoadingAssetTypes ? (
                            <UILoading variant="spinner" />
                        ) : isAssetTypesError ? (
                            <UIError title="Error" description="No se pudieron cargar los tipo de activos." variant="alert" />
                        ) : (
                            <Select
                                {...register("tipoActivoId", {
                                    required: "El tipo de activo es obligatorio",
                                    min: {
                                        value: 1,
                                        message: "Debe seleccionar un tipo de activo"
                                    }
                                })}
                                defaultValue={getValues("tipoActivoId")}
                                onValueChange={(value) => setValue("tipoActivoId", value, { shouldValidate: true })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione un tipo de activo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {assetTypes.map((assetType) => (
                                        <SelectItem key={assetType.id} value={assetType.id.toString()}>
                                            {assetType.descripcion}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        {errors.tipoActivoId && <p className="text-red-500 text-sm">{errors.tipoActivoId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fechaAdquisicion">Fecha de Adquisición</Label>
                        <Input id="fechaAdquisicion" type="date" {...register("fechaAdquisicion", {
                            required: "La fecha de adquisición es obligatoria",
                            validate: value => {
                                const today = new Date().toISOString().split('T')[0];
                                return value <= today || "La fecha de adquisición no puede ser mayor que la fecha de hoy.";
                            }
                        })} />
                        {errors.fechaAdquisicion && <p className="text-red-500 text-sm">{errors.fechaAdquisicion.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="valor">Valor</Label>
                        <Input id="valor" placeholder="Valor del activo fijo" type="number" step={"0.01"} {...register("valor", {
                            required: "El valor es obligatoria",
                            min: {
                                value: 0.01,
                                message: 'El valor del activo fijo debe ser mayor a 0.01'
                            }
                        })} />
                        {errors.valor && <p className="text-red-500 text-sm">{errors.valor.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="depreciacionAcumulada">Depreciación Acumulada</Label>
                        <Input id="depreciacionAcumulada" placeholder="Valor del activo" type="number" step={"0.01"} {...register("depreciacionAcumulada", {
                            required: "La depreciación acumulada es obligatoria",
                            min: {
                                value: 0.01,
                                message: 'La depreciación acumulada del activo fijo debe ser mayor a 0.01'
                            }
                        })} />
                        {errors.depreciacionAcumulada && <p className="text-red-500 text-sm">{errors.depreciacionAcumulada.message}</p>}
                    </div>


                    {/* <div className="space-y-2">
                        <Label htmlFor="depreciacion_acumulada">Depreciación Acumulada</Label>
                        <Input
                            type="number"
                            step="0.01"
                            id="depreciacion_acumulada"
                            name="depreciacion_acumulada"
                            placeholder="Depreciación acumulada"
                            value={formData.depreciacion_acumulada}
                            onChange={handleChange}
                            required
                        />
                    </div> */}
                    <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Select
                            {...register("estado", {
                                required: "El estado del activo fijo es obligatorio",
                                min: {
                                    value: 1,
                                    message: "Debe seleccionar un estado"
                                }
                            })}
                            defaultValue={getValues("estado")}
                            onValueChange={(value) => setValue("estado", value, { shouldValidate: true })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione un estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Inactivo</SelectItem>
                                <SelectItem value="1">Operativo</SelectItem>
                                <SelectItem value="2">En Mantenimiento</SelectItem>
                                <SelectItem value="3">Baja</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && <p className="text-red-500 text-sm">{errors.estado.message}</p>}
                    </div>
                </CardContent>
                {(isError || isCreateError || isUpdateError) && (
                    <CardContent>
                        <UIError title="Error" description="No se pudo guardar el empleado." variant="alert" />
                    </CardContent>
                )}
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => navigate("/assets", { replace: true })}>
                        Cancelar
                    </Button>
                    <Button type="submit">{id ? "Actualizar" : "Crear"} Activo Fijo</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
