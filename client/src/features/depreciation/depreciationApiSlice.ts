import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { DepreciationFormData, IDepreciacion } from './depreciationTypes';

export const depreciationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    calcularDepreciation: builder.query<Array<IDepreciacion>, DepreciationFormData>({
      query: (queryparams) => endpoints.depreciation.getCalcular(queryparams),
    }),
    saveDepreciation: builder.mutation<IDepreciacion, Partial<IDepreciacion>>({
      query: (data) => ({
        url: endpoints.depreciation.post,
        method: "POST",
        body: data,
      }),
    })
  })
})


export const {
  useLazyCalcularDepreciationQuery,
  useSaveDepreciationMutation,
} = depreciationApiSlice;