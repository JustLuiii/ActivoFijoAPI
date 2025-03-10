import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { logOut } from '../features/auth/authSlice';
// import { endpoints } from '@/services/endpoints';
// import { RootState } from '@/redux/store';
import { DEV, VITE_VERSION_API } from '@/constants/configs';

const baseQuery = fetchBaseQuery({
  baseUrl: DEV ? VITE_VERSION_API : 'http://localhost:3000/api/',
  credentials: 'include',
});

const baseQueryWithReauth = async (args: BaseQueryArgs['args'], api: BaseQueryArgs['api'], extraOptions: BaseQueryArgs['extraOptions']) => {
  const result = await baseQuery(args, api, extraOptions);

  try {
    // if (result.error) {
    //     const user = api.getState().auth?.user;

    //   if (error.status === 401) {
    //       await baseQuery(endpoints.auth?.logout, api, extraOptions);

    //     if (user) {
    //       await baseQuery(endpoints.auth.logout, api, extraOptions);
    //       window.location.reload();
    //       api.dispatch(logOut({}));
    //     }
    //   }
    // }
  } catch (error) {
    console.error(error);
    window.location.reload();
    // api.dispatch(logOut({}));
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});