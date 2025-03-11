import { IDepartments } from "@/features/departments/departmentsTypes"

export interface IEmployees {
   id: number,
   nombre: string,
   cedula: string,
   departamentoId: number,
   tipoPersona: number,
   fechaIngreso: string,
   activo: true,
   departamento: IDepartments
}

export type TEmpleadoForm = Omit<IEmployees, 'tipoPersona' | 'departamentoId' | 'departamento'> & {
  departamentoId: string;
  tipoPersona: string;
}