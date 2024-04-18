// axios-config.ts
import axios, { AxiosInstance } from "axios"
import { apiConfig } from "./apiConfig"

const axiosInstance: AxiosInstance = axios.create({
    baseURL: apiConfig.url,
    headers: apiConfig.headers,
})

export default axiosInstance
