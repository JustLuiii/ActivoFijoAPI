import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useGetByIdDepartmentsQuery, useCreateDepartmentsMutation, useUpdateDepartmentsMutation } from "@/features/departments/departmentsApiSlice";
import { UIError } from "@/components/ui-error";
import { UILoading } from "./ui-loading";

interface DepartmentFormProps {
    id?: string;
}

export const DepartmentForm = ({ id }: DepartmentFormProps) => {
    const navigate = useNavigate();

    const idDepartamento = Number(id);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<{ description: string }>({ defaultValues: { description: "" } });

    const { data: department, isLoading, isError } = useGetByIdDepartmentsQuery(Number(idDepartamento), { skip: !id });
    const [createDepartment, { isError: isCreateError }] = useCreateDepartmentsMutation();
    const [updateDepartment, { isError: isUpdateError }] = useUpdateDepartmentsMutation();

    if (isLoading) return <UILoading variant="spinner" />;

    if (idDepartamento && department) {
        setValue("description", department.descripcion);
    }

    const onSubmit = async (data: { description: string }) => {
        try {

            if (id) {
                await updateDepartment({ id: idDepartamento, descripcion: data.description, activo: department?.activo }).unwrap();
            } else {
                await createDepartment({ descripcion: data.description, activo: true }).unwrap();
            }

            navigate("/departments");
        } catch (err) {
            console.error("Error al guardar el departamento", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>{id ? "Editar Departamento" : "Crear Departamento"}</CardTitle>
                    <CardDescription>Complete la información requerida para el departamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            {...register("description", { required: "La descripción es requerida" })}
                            placeholder="Descripción del departamento"
                            rows={4}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>
                </CardContent>
                {(isError || isCreateError || isUpdateError) && (
                    <CardContent>
                        <UIError title="Error" description="No se pudo guardar el departamento." variant="alert" />
                    </CardContent>
                )}
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => navigate("/departments", { replace: true })}>
                        Cancelar
                    </Button>
                    <Button type="submit">{id ? "Actualizar" : "Crear"} Departamento</Button>
                </CardFooter>
            </Card>
        </form>
    );
};
