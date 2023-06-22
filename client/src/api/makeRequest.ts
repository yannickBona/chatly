import axios, { AxiosRequestConfig } from "axios";
import { ReqMethods } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL ?? "http://127.0.0.1:3000",
  withCredentials: true,
});

export async function makeRequest(options: AxiosRequestConfig<unknown>) {
  return await api
    .request(options)
    .then((res) => res.data)
    .catch((err) => err.response.data);
}

export async function makeAuthorizedRequest(
  options: AxiosRequestConfig<unknown>
) {
  const token = localStorage.getItem("token");
  return await api
    .request({
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}
