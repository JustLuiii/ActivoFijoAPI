import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useGetAllDepartmentsQuery } from "@/features/departments/departmentsApiSlice";
import { useGetAllAssetTypesQuery } from "@/features/asset-types/assetTypesApiSlice";
import { Input } from "./ui/input";

interface IAssetFilterComponent {
    // departments: IDepartments[],
    // assetTypes: IAssetTypes[],
    onFilter: (data: FormValuesFilter) => void;
    onReset: () => void;

}

export interface FormValuesFilter {
    tipoActivoId: string;
    departamentoId: string;
    descripcion: string;
    fechaInicio: Date | null; // Fecha puede ser nula
    fechaFin: Date | null;    // Fecha puede ser nula
}


export const AssetFilterComponent = ({ onFilter, onReset }: IAssetFilterComponent) => {

    const defaultValues = {
        tipoActivoId: "",
        departamentoId: "",
        descripcion: "",
        fechaInicio: null,
        fechaFin: null
    }

    const { control, handleSubmit, register, setValue, reset } = useForm<FormValuesFilter>({
        defaultValues: {
            ...defaultValues
        }
    });


    const { data: departments = [], isLoading: isLoadingDepartaments } = useGetAllDepartmentsQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data: assetTypes = [], isLoading: isLoadingAssetTypes } = useGetAllAssetTypesQuery(undefined, { refetchOnMountOrArgChange: true });


    interface ValidarFechasData {
        fechaInicio: Date | null;
        fechaFin: Date | null;
    }

    const validarFechas = (data: ValidarFechasData): boolean => {
        const { fechaInicio, fechaFin } = data;
        if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
            alert("La fecha de inicio no puede ser mayor que la fecha de fin");
            return false;
        }
        return true;
    };

    const onSubmit = (data: FormValuesFilter) => {
        if (validarFechas(data)) {
            onFilter(data);
        }
    };

    interface RenderCalendarField {
        value: Date | null;
        onChange: (date: Date | null) => void;
    }

    const renderCalendar = (field: RenderCalendarField) => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                    {field.value ? format(field.value, 'dd/MM/yyyy') : "Seleccionar fecha"}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
                <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={(date) => field.onChange(date || null)}
                />
            </PopoverContent>
        </Popover>
    );

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="mt-4">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Input
                            id="descripcion"
                            placeholder="Ingrese la descripción"
                            {...register("descripcion")}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tipoActivoId">Tipo de Activo</Label>
                        <Select {...register("tipoActivoId")} onValueChange={(value) => setValue("tipoActivoId", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione un tipo de activo" />
                            </SelectTrigger>
                            <SelectContent>
                                {isLoadingAssetTypes ? 'cargando...' : assetTypes.map(assetType => (
                                    <SelectItem key={assetType.id} value={assetType.id.toString()}>
                                        {assetType.descripcion}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="fechaInicio">Fecha Inicio</Label>
                        <Controller
                            control={control}
                            name="fechaInicio"
                            render={({ field }) => renderCalendar(field)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="fechaFin">Fecha Fin</Label>
                        <Controller
                            control={control}
                            name="fechaFin"
                            render={({ field }) => renderCalendar(field)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="departamentoId">Departamento</Label>
                        <Select {...register("departamentoId")} onValueChange={(value) => setValue("departamentoId", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione un departamento" />
                            </SelectTrigger>
                            <SelectContent>

                                {isLoadingDepartaments ? 'cargando...' : departments.map(department => (
                                    <SelectItem key={department.id} value={department.id.toString()}>
                                        {department.descripcion}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                <Button type="submit">Aplicar Filtros</Button>
                <Button type="button" className="ml-2" onClick={() => {
                    onReset();
                    reset({ departamentoId: '', tipoActivoId: '', fechaFin: null, fechaInicio: null })
                }}>Limpiar</Button>
            </form>
        </>

    );
};
