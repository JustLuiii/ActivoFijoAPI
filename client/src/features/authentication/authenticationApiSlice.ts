import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { User, UserLogin, UserResponse } from './authenticationTypes';

export const authenticationUser
  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<UserResponse, UserLogin>({
        query: (body) => {
          return {
            url: endpoints.authentication.login,
            method: 'POST',
            body
          }
        }
      }),
      createUsers: builder.mutation<UserResponse, Partial<User>>({
        query: (body) => {
          return {
            url: endpoints.authentication.post,
            method: 'POST',
            body
          }
        }
      })

    }),
  });

export const {
  useLoginMutation,
  useCreateUsersMutation
} = authenticationUser