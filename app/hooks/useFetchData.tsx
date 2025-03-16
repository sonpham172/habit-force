import { config } from '@/constants/config';
import { useQuery } from '@tanstack/react-query';

const fetchData = async (
  url: string, 
  method: string, 
  token?: string,
  payload?: any,
) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json', // Set content type to JSON
    };
    if (token) {
      headers['token'] = `Bearer ${token}`;
    }
  
    const options: RequestInit = {
      credentials: 'include',
      method, // HTTP method (GET, POST, PUT, DELETE, etc.)
      headers,
    };
    if(method) options['method'] = method.toUpperCase();
    if(payload) options['body'] = JSON.stringify(payload);
    const response = await fetch(`${config.apiUrl}${url}`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // const body = utf8.decode(res.bodyBytes);
    const responsePayload = await response.json();
    const message = responsePayload['message'];
    const errors = responsePayload['errors'];
    const data = responsePayload['data'];
  
    console.log('message', message, errors);
    
    return {
      message: message,
      errors: errors,
      data: data
    }
  } catch (error) {
    return {
      message: 'An error occurred',
      errors: error instanceof Error ? error.message : 'Unknown error',
    }
  }
};

export const useFetch = (queryKey: string[], url: string) => {
  return useQuery({queryKey: queryKey, queryFn: () => GET(url)});
};

export const useFetchAuth = (
  queryKey: string[], url: string, token: string
  ) => {
  return useQuery({queryKey: queryKey, queryFn: () => GETAuth(url, token)});
};

export const GET = async (url: string) => {
  return await fetchData(url, 'GET', undefined, null);
};

export const GETAuth = async (url: string, token: string) => {
  return await fetchData(url, 'GET', token, null);
};

export const POST = async (url: string, token: string, payload: any) => {
  return await fetchData(url, 'POST', token, payload);
};