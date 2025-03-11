import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { IAssetTypes } from './assetTypesTypes';

export const assetTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssetTypes: builder.query<Array<IAssetTypes>, void>({
      query: () => endpoints.assetTypes.getAll,
    }),
    getByIdAssetTypes: builder.query<IAssetTypes, number>({
      query: (id) => endpoints.assetTypes.getById(id),
    }),
    createAssetTypes: builder.mutation<IAssetTypes, Partial<IAssetTypes>>({
      query: (body) => {
        return {
          url: endpoints.assetTypes.post,
          method: 'POST',
          body
        }
      }
    }),
    updateAssetTypes: builder.mutation<IAssetTypes, Partial<IAssetTypes>>({
      query(data) {
        const { id } = data
        return {
          url: endpoints.assetTypes.update(id),
          method: 'PUT',
          body: data,
        }
      },
    }),
    deleteAssetTypes: builder.mutation<void, number>({
      query: (id) => ({
        url: endpoints.assetTypes.delete(id),
        method: 'DELETE'
      })
    })
  }),
});

export const {
  useGetAllAssetTypesQuery,
  useGetByIdAssetTypesQuery,
  useLazyGetByIdAssetTypesQuery,
  useCreateAssetTypesMutation,
  useUpdateAssetTypesMutation,
  useDeleteAssetTypesMutation
} = assetTypesApiSlice;