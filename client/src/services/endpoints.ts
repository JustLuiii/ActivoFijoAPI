export const endpoints = {
    departments: {
        getAll: 'departments',
        getById: (id: number) => `departments/${id}`,
        post: 'departments',
        update: (id: number) => `departments/${id}`,
        delete: (id: number) => `departments/${id}`
    }
}