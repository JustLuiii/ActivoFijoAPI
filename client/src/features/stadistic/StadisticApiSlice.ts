import { apiSlice } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import { IStadistic } from './StadisticTypes';

export const stadisticApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStadistic: builder.query<IStadistic, void>({
      query: () => endpoints.stadistic.getAll,
    })
  })
})

export const {
  useGetAllStadisticQuery
} = stadisticApiSlice;