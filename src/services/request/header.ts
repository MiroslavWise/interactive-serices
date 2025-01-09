import { authToken } from "../auth/authService"

/**  Функция для создания заголовков запроса */
export const createHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  const token = authToken()
  if (token) {
    headers.Authorization = token
  }

  return headers
}
