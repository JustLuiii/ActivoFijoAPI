import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';

export const departmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartments: builder.query<Array<string>, void>({
      query: () => endpoints.departments.getAll,
    }),
  }),
});

export const {
  useGetAllDepartmentsQuery,
} = departmentsApiSlice;