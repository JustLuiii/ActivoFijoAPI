import {
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAccountantsMutation, useUpdateAccountantsMutation, useGetByIdAccountantsQuery } from "@/features/accountants/accountantsApiSlice";
import { UIError } from "@/components/ui-error";
import { UILoading } from "@/components/ui-loading";
import { useEffect } from "react";
import { z } from "zod";

const currentDate = new Date();
const defaultDescription = `Asiento de activo fijo correspondiente ${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

const schema = z.object({
    descripcion: z.string().min(1, "La descripción es requerida"),
    fechaAsiento: z.string().min(1, "La fecha es requerida"),
    detalles: z.array(z.object({
        cuentaId: z.union([z.literal(65), z.literal(66)], { required_error: "Cuenta requerida" }),
        tipoMovimiento: z.union([z.literal("DB"), z.literal("CR")], { required_error: "Tipo de movimiento requerido" }),
        montoAsiento: z.number().positive("Debe ser un monto válido")
    })).min(2, "Debe agregar al menos dos cuentas")
});

type AccountantFormValues = z.infer<typeof schema>;

interface Props {
    id?: string;
}

export const AccountantForm = ({ id }: Props) => {
    const navigate = useNavigate();
    const isEdit = !!id;

    const { data: accountant, isLoading: isLoadingData } = useGetByIdAccountantsQuery(Number(id), { skip: !id });

    const [createAccountant, { isError: isCreateError }] = useCreateAccountantsMutation();
    const [updateAccountant, { isError: isUpdateError }] = useUpdateAccountantsMutation();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<AccountantFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            descripcion: defaultDescription,
            fechaAsiento: currentDate.toISOString().substring(0, 10),
            detalles: [{ cuentaId: 65, tipoMovimiento: "DB", montoAsiento: 0 }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "detalles"
    });

    useEffect(() => {
        if (isEdit && accountant) {
            setValue("descripcion", accountant.descripcion);
            setValue("fechaAsiento", accountant.fechaAsiento);
            setValue("detalles", accountant.detalles.map(detalle => ({
                ...detalle,
                cuentaId: detalle.cuentaId as 65 | 66,
                tipoMovimiento: detalle.tipoMovimiento as "DB" | "CR",
            })));
        }
    }, [accountant, isEdit, setValue]);

    const onSubmit = async (data: AccountantFormValues) => {
        try {
            if (isEdit) {
                await updateAccountant({ id: Number(id), ...data }).unwrap();
            } else {
                await createAccountant(data).unwrap();
            }

            navigate("/accountant-entrys", { replace: true });
        } catch (error) {
            console.error("Error en envío:", error);
        }
    };

    if (isEdit && isLoadingData) return <UILoading variant="spinner" />;

    console.log(errors.detalles?.root)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>{isEdit ? "Editar Entrada Contable" : "Nueva Entrada Contable"}</CardTitle>
                    <CardDescription>Complete la información requerida</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Descripción</Label>
                        <Textarea {...register("descripcion")} />
                        {errors.descripcion && <p className="text-sm text-red-500">{errors.descripcion.message}</p>}
                    </div>

                    <div>
                        <Label>Fecha del Asiento</Label>
                        <Input type="date" {...register("fechaAsiento")} />
                        {errors.fechaAsiento && <p className="text-sm text-red-500">{errors.fechaAsiento.message}</p>}
                    </div>

                    <div className="space-y-2 space-x-2">
                        <Label>Detalles</Label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-12 gap-x-3 items-center justify-center">
                                <div className="col-span-4">
                                    <Label>Cuenta</Label>
                                    <Controller
                                        control={control}
                                        name={`detalles.${index}.cuentaId`}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value?.toString()}
                                                onValueChange={(val) => field.onChange(Number(val))}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Seleccionar cuenta" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="65">65 - Gasto depreciación</SelectItem>
                                                    <SelectItem value="66">66 - Depreciación acumulada</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.detalles?.[index]?.cuentaId && (
                                        <p className="text-sm text-red-500">{errors.detalles[index]?.cuentaId?.message}</p>
                                    )}
                                </div>

                                <div className="col-span-3">
                                    <Label>Tipo Movimiento</Label>
                                    <Controller
                                        control={control}
                                        name={`detalles.${index}.tipoMovimiento`}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Tipo" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="DB">Débito</SelectItem>
                                                    <SelectItem value="CR">Crédito</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.detalles?.[index]?.tipoMovimiento && (
                                        <p className="text-sm text-red-500">{errors.detalles[index]?.tipoMovimiento?.message}</p>
                                    )}
                                </div>

                                <div className="col-span-3">
                                    <Label>Monto (RD$)</Label>
                                    <Controller
                                        control={control}
                                        name={`detalles.${index}.montoAsiento`}
                                        render={({ field }) => (
                                            <Input
                                                className="w-full"
                                                type="text"
                                                value={
                                                    field.value?.toLocaleString("es-DO", {
                                                        style: "currency",
                                                        currency: "DOP",
                                                        minimumFractionDigits: 2
                                                    })
                                                }
                                                onChange={(e) => {
                                                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                                                    field.onChange(parseFloat(raw || "0"));
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.detalles?.[index]?.montoAsiento && (
                                        <p className="text-sm text-red-500">{errors.detalles[index]?.montoAsiento?.message}</p>
                                    )}
                                </div>

                                <Button className="col-span-2 flex justify-end" variant="ghost" type="button" onClick={() => remove(index)}>Eliminar</Button>
                            </div>
                        ))}
                        {typeof errors.detalles?.root?.message === "string" && (
                            <p className="text-sm text-red-500">{errors.detalles?.root?.message}</p>
                        )}
                        <Button type="button" onClick={() => append({ cuentaId: 65, tipoMovimiento: "DB", montoAsiento: 0 })}>
                            Agregar Detalle
                        </Button>

                    </div>
                </CardContent>
                {(isCreateError || isUpdateError) && (
                    <CardContent>
                        <UIError title="Error" description="Ocurrió un error al guardar la entrada." variant="alert" />
                    </CardContent>
                )}
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => navigate("/accountant-entrys", { replace: true })}>
                        Cancelar
                    </Button>
                    <Button type="submit">{isEdit ? "Actualizar" : "Crear"} Entrada</Button>
                </CardFooter>
            </Card>
        </form>
    );
};
