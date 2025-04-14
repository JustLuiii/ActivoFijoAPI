import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { IAccountantEntry } from './accountantsTypes';

export const accountantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccountants: builder.query<IAccountantEntry[], void>({
      query: () => endpoints.accountants.getAll,
    }),
    getByIdAccountants: builder.query<IAccountantEntry, number>({
      query: (id) => endpoints.accountants.getById(id),
    }),
    createAccountants: builder.mutation<{ message: string }, Partial<IAccountantEntry>>({
      query: (body) => {
        return {
          url: endpoints.accountants.post,
          method: 'POST',
          body
        }
      }
    }),
    updateAccountants: builder.mutation<{ message: string }, Partial<IAccountantEntry>>({
      query(data) {
        const { id } = data
        return {
          url: endpoints.accountants.update(id),
          method: 'PUT',
          body: data,
        }
      },
    })
  }),
});

export const {
  useGetAllAccountantsQuery,
  useGetByIdAccountantsQuery,
  useLazyGetByIdAccountantsQuery,
  useUpdateAccountantsMutation,
  useCreateAccountantsMutation,
} = accountantsApiSlice;