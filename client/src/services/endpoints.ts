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
    }

}