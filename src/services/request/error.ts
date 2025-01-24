import { IResponse } from "./types"

/**  Функция для обработки ошибок */
export const handleError = (error: unknown): IResponse<any> => {
  console.error("Fetch error:", error)
  throw new Error("Ошибка запроса: ")
  // return {
  //   data: null,
  //   error: error instanceof Error ? error : new Error("An unknown error occurred"),
  // }
}
