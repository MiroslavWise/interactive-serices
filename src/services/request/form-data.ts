import { AxiosError, type RawAxiosRequestHeaders } from "axios"

import { EStatusAuth } from "@/types/enum"
import { IResponse, type MethodUploadFile } from "./types"

import { instance } from "./instance"
import { authToken } from "../auth/authService"
import { IResponseUploadFile } from "../file-upload/types"

export const postForm: MethodUploadFile = async ({ url, file, onUploadProgress }) => {
  const fullTokenString = authToken()

  if (!fullTokenString) {
    return {
      data: null,
      error: EStatusAuth.NOT_AUTHORIZATION,
      status: 401,
      meta: null,
    } as IResponse<IResponseUploadFile>
  }

  // const head: RawAxiosRequestHeaders = {
  //   "Content-Type": "multipart/form-data",
  // }

  // if (fullTokenString) {
  //   head.Authorization = fullTokenString
  // }

  return instance
    .postForm(url, file, {
      // headers: head,
      onUploadProgress: (event) => {
        if (onUploadProgress) {
          onUploadProgress(event, file.get("caption"))
        }
      },
    })
    .then((response) => response as unknown as IResponse<IResponseUploadFile>)
}
