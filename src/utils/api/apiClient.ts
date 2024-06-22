import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {APP_ENV} from "../../env";
import {getLocalStorage} from "../storage/localStorageUtils.ts";
import {isTokenActive} from "../storage/isTokenActive.ts";

interface IApiClientConfig extends AxiosRequestConfig {
    baseURL: string;
}

export const apiClient: AxiosInstance = axios.create({
    baseURL: APP_ENV.BASE_URL,
} as IApiClientConfig);

interface IApiClientMediaConfig {
    baseURL: string;
    headers: {
        'Content-Type': string;
    };
}

export const apiMediaClient: AxiosInstance = axios.create({
    baseURL: APP_ENV.BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
} as IApiClientMediaConfig);

apiClient.interceptors.request.use((config) => {
   const token = getLocalStorage('authToken') as string;

   if(isTokenActive(token)) {
       config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});

apiMediaClient.interceptors.request.use((config) => {
    const token = getLocalStorage('authToken') as string;

    if (isTokenActive(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});