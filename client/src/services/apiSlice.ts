import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { logOut } from '../features/auth/authSlice';
// import { endpoints } from '@/services/endpoints';
// import { RootState } from '@/redux/store';
import { DEV, VITE_VERSION_API, VITE_DOMAIN_API } from '@/constants/configs';

const baseQuery = fetchBaseQuery({
  baseUrl: DEV ? VITE_VERSION_API : VITE_DOMAIN_API + VITE_VERSION_API,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    const tokenServices = localStorage.getItem('tokenServices');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('AuthorizationExterno', `Bearer ${tokenServices}`);
      headers.set('Content-Type', 'application/json');
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
      localStorage.removeItem("tokenServices");
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