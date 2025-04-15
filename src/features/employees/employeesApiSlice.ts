import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { IEmployees, TEmpleadoForm } from './employeesTypes';

export const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Array<IEmployees>, void>({
      query: () => endpoints.employees.getAll,
    }),
    getByIdEmployees: builder.query<IEmployees, number>({
      query: (id) => endpoints.employees.getById(id),
    }),
    createEmployees: builder.mutation<IEmployees, Partial<TEmpleadoForm>>({
      query: (body) => {
        return {
          url: endpoints.employees.post,
          method: 'POST',
          body
        }
      }
    }),
    updateEmployees: builder.mutation<IEmployees, Partial<TEmpleadoForm>>({
      query(data) {
        const { id } = data
        return {
          url: endpoints.employees.update(id),
          method: 'PUT',
          body: data,
        }
      },
    }),
    deleteEmployees: builder.mutation<void, number>({
      query: (id) => ({
        url: endpoints.employees.delete(id),
        method: 'DELETE'
      })
    })
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetByIdEmployeesQuery,
  useLazyGetByIdEmployeesQuery,
  useCreateEmployeesMutation,
  useUpdateEmployeesMutation,
  useDeleteEmployeesMutation
} = employeesApiSlice;