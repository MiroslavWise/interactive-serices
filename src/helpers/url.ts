import axios from "axios"

import env from "@/config/environment"

export const URL_API = `${env.server.host}/api/v1`

export const axiosInstance = axios.create({
  baseURL: URL_API,
})