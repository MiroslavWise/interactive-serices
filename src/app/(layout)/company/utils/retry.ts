import { clg } from "@console"

export const retry = (count: number, error: any): boolean => {
  clg("data?.error: ", error, "warning")
  if (!!error) {
    return count >= 3 ? false : true
  } else {
    return false
  }
}
