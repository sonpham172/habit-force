import { config } from '@/constants/config';
import { getToken } from '@/app/utils/secureStore';
import { router } from 'expo-router';

export interface ApiResponse<T> {
  message: string;
  status: boolean;
  data: T;
  errors?: string;
}

const checkAuth = async () => {
  const token = await getToken();
  if (!token) {
    router.replace('/(auth)/login');
    throw new Error('No token available');
  }
  return token;
};

export const fetchData = async <T extends unknown>(
  url: string,
  method: string,
  payload?: unknown,
  requestToken: boolean = false,
  isFormData: boolean = false
): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {};
    const token = requestToken ? await checkAuth() : null;
    if(!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers['token'] = `Bearer ${token}`;
    }
  
    const options: RequestInit = {
      credentials: 'include',
      method,
      headers,
    };
    if(method) options['method'] = method.toUpperCase();
    if(payload) options['body'] = isFormData ? payload as BodyInit : JSON.stringify(payload);
    const response = await fetch(`${config.apiUrl}${url}`, options);

    const responsePayload = await response.json();
    const message: string = responsePayload['message'];
    const data = responsePayload['data'];
    const status: boolean = responsePayload['status'];
    
    return {
      message,
      status,
      data
    };
  } catch (error) {
    return {
      message: 'An error occurred',
      errors: error instanceof Error ? error.message : 'Unknown error',
      status: false,
      data: null as T
    };
  }
};

export const GET = async <T extends unknown>(url: string): Promise<ApiResponse<T>> => {
  return await fetchData<T>(url, 'GET', null);
};

export const GETAuth = async <T extends unknown>(url: string): Promise<ApiResponse<T>> => {
  return await fetchData<T>(url, 'GET', null, true); 
};

export const POST = async <T extends unknown>(url: string, payload: unknown): Promise<ApiResponse<T>> => {
  return await fetchData<T>(url, 'POST', payload);
};

export const POSTFormData = async <T extends unknown>(url: string, payload: unknown): Promise<ApiResponse<T>> => {
  return await fetchData<T>(url, 'POST', payload, true, true);
};

export const POSTAuth = async <T extends unknown>(url: string, payload: unknown): Promise<ApiResponse<T>> => {
  return await fetchData<T>(url, 'POST', payload, true);
};
