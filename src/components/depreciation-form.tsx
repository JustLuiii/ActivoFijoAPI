import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { UILoading } from "./ui-loading"
import { UIError } from "./ui-error"
import { useGetAllAssetsQuery } from "@/features/assets/assetsApiSlice"
import { DepreciationFormData, IDepreciacion } from "@/features/depreciation/depreciationTypes"
import { useLazyCalcularDepreciationQuery, useSaveDepreciationMutation } from "@/features/depreciation/depreciationApiSlice"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export const DepreciationForm = () => {

    const { data: activos = [], isLoading, isError } = useGetAllAssetsQuery();
    const [depreciationCalculate] = useLazyCalcularDepreciationQuery()
    const [createDepreciacion] = useSaveDepreciationMutation();

    // const [selectedAsset, setSelectedAsset] = useState<IAssets[] | null>(null);
    const [resultado, setResultado] = useState<IDepreciacion[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<DepreciationFormData>();

    const onSubmit = async (data: DepreciationFormData) => {
        setError(null);
        setResultado(null);

        try {

            const response = await depreciationCalculate(data).unwrap();
            setResultado(response);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        }
    };



    const handleSaveDepreciacion = async () => {
        if (!resultado || resultado.length === 0) return;

        const last = resultado[resultado.length - 1];

        try {

            await createDepreciacion({
                ...last,
                activoFijoId: watch("idActivoFijo"),
            });

            setResultado(null);
            toast.success("Depreciación guardada exitosamente");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Error al guardar la depreciación");
        }
    };

    const selectedAsset = activos.find(a => a.id === watch("idActivoFijo")) || null;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Calcular Depreciación</CardTitle>
                    <CardDescription>Ingrese los datos necesarios para calcular la depreciación de un activo fijo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Activo fijo */}
                    <div className="space-y-2">
                        <Label htmlFor="idActivoFijo">Activo Fijo</Label>
                        {isLoading ? (
                            <UILoading variant="spinner" />
                        ) : isError ? (
                            <UIError title="Error" description="No se pudieron cargar los activos" variant="alert" />
                        ) : (
                            <Select
                                onValueChange={(value) => setValue("idActivoFijo", Number(value), { shouldValidate: true })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione un activo fijo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {activos.map((activo) => (
                                        <SelectItem key={activo.id} value={activo.id.toString()}>
                                            {activo.descripcion} - {activo.tipoActivo}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        {errors.idActivoFijo && <p className="text-red-500 text-sm">{errors.idActivoFijo.message}</p>}
                    </div>

                    {/* Vida útil */}
                    <div className="space-y-2">
                        <Label htmlFor="vidaUtilAnios">Vida Útil (años)</Label>
                        <Input
                            type="number"
                            {...register("vidaUtilAnios", {
                                required: "Este campo es obligatorio",
                                min: { value: 1, message: "Debe ser mayor a 0" },
                            })}
                            placeholder="Ej. 5"
                        />
                        {errors.vidaUtilAnios && <p className="text-red-500 text-sm">{errors.vidaUtilAnios.message}</p>}
                    </div>

                    {/* Valor residual */}
                    <div className="space-y-2">
                        <Label htmlFor="valorResidual">Valor Residual</Label>
                        <Input
                            type="number"
                            step="0.01"
                            {...register("valorResidual", {
                                required: "Este campo es obligatorio",
                                min: { value: 0, message: "Debe ser mayor o igual a 0" },
                            })}
                            placeholder="Ej. 1000.00"
                        />
                        {errors.valorResidual && <p className="text-red-500 text-sm">{errors.valorResidual.message}</p>}
                    </div>

                    {/* Fecha de corte */}
                    <div className="space-y-2">
                        <Label htmlFor="fechaCorte">Fecha de Corte</Label>
                        <Input
                            type="date"
                            {...register("fechaCorte", {
                                required: "Este campo es obligatorio",
                            })}
                        />
                        {errors.fechaCorte && <p className="text-red-500 text-sm">{errors.fechaCorte.message}</p>}
                    </div>
                </CardContent>

                {error && (
                    <CardContent>
                        <UIError title="Error" description={error} variant="alert" />
                    </CardContent>
                )}

                <CardFooter className="flex justify-end">
                    <Button type="submit">Calcular</Button>
                </CardFooter>
            </Card>

            {/* Resultados */}
            {resultado && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Resultado de Depreciación</CardTitle>
                        <CardDescription>
                            Depreciación del activo: <strong>{selectedAsset?.descripcion}</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border">
                                <thead>
                                    <tr>
                                        <th className="p-2 border">Año</th>
                                        <th className="p-2 border">Mes</th>
                                        {/* <th className="p-2 border">Valor Inicial</th> */}
                                        <th className="p-2 border">Depreciado</th>
                                        <th className="p-2 border">Valor Final</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultado.map((depreciation, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="p-2 border">{depreciation.anioProceso}</td>
                                            <td className="p-2 border">{depreciation.mesProceso}</td>
                                            {/* <td className="p-2 border">${depreciation.}</td> */}
                                            <td className="p-2 border">${depreciation.montoDepreciado.toFixed(2)}</td>
                                            <td className="p-2 border">${depreciation.depreciacionAcumulada.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="button" variant="secondary" onClick={handleSaveDepreciacion}>
                            Guardar depreciación
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </form>
    )
}
