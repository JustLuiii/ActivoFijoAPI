import { DepreciationFormData } from "@/features/depreciation/depreciationTypes";

export const endpoints = {
    authentication: {
        getAll: 'authentication',
        login: `authentication/login`,
        post: 'authentication/registrar',
    },
    departments: {
        getAll: 'departamentos',
        getById: (id: number) => `departamentos/${id}`,
        post: 'departamentos',
        update: (id?: number) => `departamentos/${id}`,
        delete: (id?: number) => `departamentos/${id}`
    },
    users: {
        getAll: 'usuarios',
        getById: (id: number) => `usuarios/${id}`,
        post: 'usuarios',
        update: (id?: number) => `usuarios/${id}`,
        delete: (id?: number) => `usuarios/${id}`
    },
    employees: {
        getAll: 'empleados',
        getById: (id: number) => `empleados/${id}`,
        post: 'empleados',
        update: (id?: number) => `empleados/${id}`,
        delete: (id?: number) => `empleados/${id}`
    },
    stadistic: {
        getAll: `estadistica`
    },
    accountants: {
        getAll: 'entradaContable',
        getById: (id: number) => `entradaContable/${id}`,
        post: 'entradaContable',
        update: (id?: number) => `entradaContable/${id}`,
    },
    assetTypes: {
        getAll: 'tiposActivos',
        getById: (id: number) => `tiposActivos/${id}`,
        post: 'tiposActivos',
        update: (id?: number) => `tiposActivos/${id}`,
        delete: (id?: number) => `tiposActivos/${id}`
    },
    assets: {
        getAll: 'activosfijos',
        getById: (id: number) => `activosfijos/${id}`,
        post: 'activosfijos',
        update: (id?: number) => `activosfijos/${id}`,
        delete: (id?: number) => `activosfijos/${id}`
    },
    depreciation: {
        getCalcular: ({ idActivoFijo, vidaUtilAnios, valorResidual, fechaCorte }: DepreciationFormData) =>
            `depreciacion/calcular/${idActivoFijo}/${vidaUtilAnios}/${valorResidual}/${fechaCorte}`,
        post: 'depreciacion',
    }

}