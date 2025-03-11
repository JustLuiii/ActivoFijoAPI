import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { IDepartments } from './departmentsTypes';

export const departmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartments: builder.query<Array<IDepartments>, void>({
      query: () => endpoints.departments.getAll,
    }),
    getByIdDepartments: builder.query<IDepartments, number>({
      query: (id) => endpoints.departments.getById(id),
    }),
    createDepartments: builder.mutation<IDepartments, Partial<IDepartments>>({
      query: (body) => {
        return {
          url: endpoints.departments.post,
          method: 'POST',
          body
        }
      }
    }),
    updateDepartments: builder.mutation<IDepartments, Partial<IDepartments>>({
      query(data) {
        const { id } = data
        return {
          url: endpoints.departments.update(id),
          method: 'PUT',
          body: data,
        }
      },
    }),
    deleteDepartments: builder.mutation<void, number>({
      query: (id) => ({
        url: endpoints.departments.delete(id),
        method: 'DELETE'
      })
    })
  }),
});

export const {
  useGetAllDepartmentsQuery,
  useGetByIdDepartmentsQuery,
  useCreateDepartmentsMutation,
  useUpdateDepartmentsMutation,
  useDeleteDepartmentsMutation
} = departmentsApiSlice;