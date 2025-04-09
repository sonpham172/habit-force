import { useQuery } from '@tanstack/react-query';
import { ApiResponse, GET, GETAuth } from '@/app/utils/api';

export const useFetch = <T extends unknown>(queryKey: string[], url: string) => {
  const query = useQuery<ApiResponse<T>>({
    queryKey: queryKey, 
    queryFn: () => GET<T>(url)
  });

  return {
    ...query,
    data: query.data?.data,
    message: query.data?.message,
    status: query.data?.status,
    errors: query.data?.errors,
  };
};

export const useFetchAuth = <T extends unknown>(
  queryKey: string[], 
  url: string,
  enabled: boolean = true
) => {
  const query = useQuery<ApiResponse<T>>({
    queryKey: queryKey, 
    queryFn: () => GETAuth<T>(url),
    enabled: enabled
  });

  return {
    ...query,
    data: query.data?.data,
    message: query.data?.message,
    status: query.data?.status,
    errors: query.data?.errors,
  };
};
