import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { IAssets } from './assetsTypes';

export const assetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssets: builder.query<Array<IAssets>, void>({
      query: () => endpoints.assets.getAll,
    }),
    getByIdAssets: builder.query<IAssets, number>({
      query: (id) => endpoints.assets.getById(id),
    }),
    createAssets: builder.mutation<IAssets, Partial<IAssets>>({
      query: (body) => {
        return {
          url: endpoints.assets.post,
          method: 'POST',
          body
        }
      }
    }),
    updateAssets: builder.mutation<IAssets, Partial<IAssets>>({
      query(data) {
        const { id } = data
        return {
          url: endpoints.assets.update(id),
          method: 'PUT',
          body: data,
        }
      },
    }),
    deleteAssets: builder.mutation<void, number>({
      query: (id) => ({
        url: endpoints.assets.delete(id),
        method: 'DELETE'
      })
    })
  }),
});

export const {
  useGetAllAssetsQuery,
  useGetByIdAssetsQuery,
  useCreateAssetsMutation,
  useUpdateAssetsMutation,
  useDeleteAssetsMutation
} = assetsApiSlice;