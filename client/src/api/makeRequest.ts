import axios, { AxiosError } from "axios";
import { ReqMethods } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL ?? "http://127.0.0.1:3000",
  withCredentials: true,
});

export async function makeRequest(method: ReqMethods, url: string, data?: any) {
  return await api
    .request({ method: method, url: url, data: data })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response?.data?.error) ?? "Error");
}
