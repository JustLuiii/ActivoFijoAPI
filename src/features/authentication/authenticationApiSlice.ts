import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { UserLogin, UserResponse } from '../users/usersTypes';

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
      })
    }),
  });

export const {
  useLoginMutation
} = authenticationUser