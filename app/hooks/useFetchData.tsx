import { config } from '@/constants/config';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/app/types/fetch';

const fetchData = async <T,>(
  url: string, 
  method: string, 
  token?: string,
  payload?: any,
): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['token'] = `Bearer ${token}`;
    }
  
    const options: RequestInit = {
      credentials: 'include',
      method: method.toUpperCase(),
      headers,
    };

    if (payload) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(`${config.apiUrl}${url}`, options);
    const responsePayload = await response.json();
    console.log('responsePayload', responsePayload);
    
    const message: string = responsePayload.message;
    const data = responsePayload.data;
    const status: boolean = responsePayload.status;
    
    return {
      message,
      status,
      data
    };
  } catch (error) {
    return {
      message: 'An error occurred',
      status: false,
      data: null as T
    };
  }
};

export const useFetch = <T,>(queryKey: string[], url: string) => {
  return useQuery<ApiResponse<T>>({
    queryKey,
    queryFn: () => GET<T>(url)
  });
};

export const useFetchAuth = <T,>(
  queryKey: string[], 
  url: string, 
  token: string
) => {
  return useQuery<ApiResponse<T>>({
    queryKey,
    queryFn: () => GETAuth<T>(url, token)
  });
};

export const GET = async <T,>(url: string): Promise<ApiResponse<T>> => {
  return await fetchData<T>(url, 'GET', undefined, null as T);
};

export const GETAuth = async <T,>(url: string, token: string): Promise<ApiResponse<T>> => {
  return await fetchData<T>(url, 'GET', token, null as T);
};

export const POST = async <T,>(url: string, token: string, payload: unknown): Promise<ApiResponse<T>> => {
  return await fetchData<T>(url, 'POST', token, payload);
};