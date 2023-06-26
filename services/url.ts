import axios from 'axios'

export const URL = process.env.NEXT_PUBLIC_URL

export const axiosInstance = axios.create({
        baseURL: URL,
})