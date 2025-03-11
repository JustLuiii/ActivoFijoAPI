import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { InputMask } from "@react-input/mask";

import { useCreateEmployeesMutation, useUpdateEmployeesMutation, useLazyGetByIdEmployeesQuery } from "@/features/employees/employeesApiSlice";
import { UIError } from "@/components/ui-error";
import { UILoading } from "@/components/ui-loading";
import { useGetAllDepartmentsQuery } from "@/features/departments/departmentsApiSlice";
import { CheckDocument } from "@/utils/check-document";
import { TEmpleadoForm } from "@/features/employees/employeesTypes";
import { useEffect } from "react";



interface EmployeeFormProps {
    id?: string;
}

export const EmployeeForm = ({ id }: EmployeeFormProps) => {

    const navigate = useNavigate();
    const employeeId = Number(id);

    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm<TEmpleadoForm>({
        defaultValues: {
            nombre: "",
            cedula: "",
            departamentoId: "",
            tipoPersona: "",
            fechaIngreso: "",
            activo: true
        }
    });

    const { data: departments = [], isLoading: isLoadingDepartments, isError: isDepartmentsError } = useGetAllDepartmentsQuery(undefined, { refetchOnMountOrArgChange: true });

    const [fetchEmployee, { isFetching, isError }] = useLazyGetByIdEmployeesQuery();

    useEffect(() => {
        if (id) {
            fetchEmployee(parseInt(id))
                .unwrap()
                .then((data) => {
                    console.log(data);
                    setValue('nombre', data.nombre);
                    setValue('id', data.id);
                    setValue('tipoPersona', data.tipoPersona.toString());
                    setValue('departamentoId', data.departamentoId.toString());
                    setValue('cedula', data.cedula);
                    setValue('activo', data.activo);
                    setValue('fechaIngreso', new Date(data.fechaIngreso).toISOString().split('T')[0]);
                });
        }
    }, [id, reset]);

    const [createEmployee, { isError: isCreateError }] = useCreateEmployeesMutation();
    const [updateEmployee, { isError: isUpdateError }] = useUpdateEmployeesMutation();

    if (isFetching) return <UILoading variant="spinner" />;

    const onSubmit = async (data: Partial<TEmpleadoForm>) => {

        try {

            if (id) {
                console.log(data);
                await updateEmployee({ id: employeeId, ...data, activo: data?.activo }).unwrap();
            } else {
                await createEmployee({ ...data, activo: true }).unwrap();
            }

            navigate("/employees");
        } catch (err) {
            console.error("Error al guardar el empleado", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>{id ? "Editar Empleado" : "Crear Empleado"}</CardTitle>
                    <CardDescription>Complete la información requerida para el empleado</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" {...register("nombre", { required: "El nombre es obligatorio" })} placeholder="Nombre del empleado" />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cedula">
                            Cédula
                        </Label>
                        <InputMask
                            mask="999-9999999-9"
                            replacement={{ 9: /\d/ }}
                            id="cedula"
                            {...register("cedula", {
                                required: "La cédula es obligatoria.",
                                pattern: {
                                    value: /^\d{3}-\d{7}-\d{1}$/,
                                    message: "El formato debe ser ###-#######-#",
                                },
                                validate: CheckDocument,
                            })}
                            placeholder="000-0000000-0"
                            className="input border border-gray-300 rounded-md p-2 w-full"
                        />
                        {errors.cedula && <p className="text-red-500 text-sm">{errors.cedula.message}</p>}
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
                        <Label htmlFor="tipoPersona">Tipo de Persona</Label>
                        <Select
                            {...register("tipoPersona", {
                                required: "El departamento es obligatorio",
                                min: {
                                    value: 1,
                                    message: "Debe seleccionar un departamento"
                                }
                            })}
                            defaultValue={getValues("tipoPersona")}
                            // value={getValues("tipoPersona") ? getValues("tipoPersona").toString() : ""}
                            onValueChange={(value) => setValue("tipoPersona", value, { shouldValidate: true })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione tipo de persona" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Física</SelectItem>
                                <SelectItem value="2">Jurídica</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
                        <Input id="fechaIngreso" type="date" {...register("fechaIngreso", {
                            required: "La fecha de ingreso es obligatoria",
                            validate: value => {
                                const today = new Date().toISOString().split('T')[0];
                                return value <= today || "La fecha de ingreso no puede ser mayor que la fecha de hoy.";
                            }
                        })} />
                        {errors.fechaIngreso && <p className="text-red-500 text-sm">{errors.fechaIngreso.message}</p>}
                    </div>
                </CardContent>

                {(isError || isCreateError || isUpdateError) && (
                    <CardContent>
                        <UIError title="Error" description="No se pudo guardar el empleado." variant="alert" />
                    </CardContent>
                )}

                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => navigate("/employees", { replace: true })}>
                        Cancelar
                    </Button>
                    <Button type="submit">{id ? "Actualizar" : "Crear"} Empleado</Button>
                </CardFooter>
            </Card>
        </form>
    );
};
