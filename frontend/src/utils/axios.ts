import axios, { type AxiosInstance } from "axios";

export default class AxiosProvider {
  private static instance: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!AxiosProvider.instance) {
      AxiosProvider.instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 60000,
      });
    }
    return AxiosProvider.instance;
  }
}
