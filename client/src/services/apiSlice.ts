import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { logOut } from '../features/auth/authSlice';
// import { endpoints } from '@/services/endpoints';
// import { RootState } from '@/redux/store';
import { DEV, VITE_VERSION_API } from '@/constants/configs';

const baseQuery = fetchBaseQuery({
  baseUrl: DEV ? VITE_VERSION_API : 'http://localhost:3000/api/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args: BaseQueryArgs['args'], api: BaseQueryArgs['api'], extraOptions: BaseQueryArgs['extraOptions']) => {
  const result = await baseQuery(args, api, extraOptions);

  try {

    if (result.error && result.error.status === 401) {
      console.warn("Token inválido o expirado");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }

    return result;
  } catch (error) {
    console.error(error);
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});