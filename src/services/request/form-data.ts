import { AxiosError, type RawAxiosRequestHeaders } from "axios"

import { EStatusAuth } from "@/types/enum"
import { type MethodUploadFile } from "./types"

import { instance } from "./instance"
import { authToken } from "../auth/authService"

export const postForm: MethodUploadFile = async ({ url, file, onUploadProgress }) => {
  const fullTokenString = authToken()

  if (!fullTokenString) {
    return {
      data: null,
      error: EStatusAuth.NOT_AUTHORIZATION,
    }
  }

  const head: RawAxiosRequestHeaders = {
    "Content-Type": "multipart/form-data",
  }

  if (fullTokenString) {
    head.Authorization = fullTokenString
  }

  return instance
    .postForm(url, file, {
      headers: head,
      onUploadProgress: (event) => {
        if (onUploadProgress) {
          onUploadProgress(event, file.get("caption"))
        }
      },
    })
    .then(({ data, status }) => {
      if (status >= 200 && status < 300) {
        return {
          meta: data?.meta ?? null,
          data: data?.data ?? null,
          error: data?.error ?? null,
        }
      } else {
        return {
          meta: data?.meta ?? null,
          data: data?.data ?? null,
          error: data?.error ?? null,
        }
      }
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        const e = error?.response?.data?.error
        return {
          data: null,
          error: e,
        }
      }

      return {
        data: null,
        error: error,
      }
    })
}
