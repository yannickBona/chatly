import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL ?? "http://127.0.0.1:3000",
  withCredentials: true,
});

export async function makeRequest(url: string, options?: any) {
  return await api(url, options)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response?.data?.error) ?? "Error");
}
