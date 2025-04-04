import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { User, UserResponse } from './usersTypes';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<Array<User>, void>({
      query: () => endpoints.users.getAll,
    }),
    getByIdUsers: builder.query<User, number>({
      query: (id) => endpoints.users.getById(id),
    }),
    createUsers: builder.mutation<UserResponse, Partial<User>>({
      query: (body) => {
        return {
          url: endpoints.authentication.post,
          method: 'POST',
          body
        }
      }
    }),
    updateUsers: builder.mutation<User, Partial<User>>({
      query(data) {
        const { id } = data
        return {
          url: endpoints.users.update(id),
          method: 'PUT',
          body: data,
        }
      },
    }),
    deleteEmployees: builder.mutation<void, number>({
      query: (id) => ({
        url: endpoints.users.delete(id),
        method: 'DELETE'
      })
    })
  }),
});

export const {
  useCreateUsersMutation
} = usersApiSlice;