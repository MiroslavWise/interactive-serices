import { IResponse, MethodPost } from "./types"

import { instance, instanceHeader } from "./instance"

import { URL_API } from "@/helpers"
import { returnWrapper } from "./return-wrapper"

export interface IPost {
  url: string
  body: object | any
}

export const post = async ({ url, body }: IPost, isInvalid?: boolean): Promise<IResponse<any>> => {
  let data = {}

  if (typeof body === "object") {
    data = { ...body }
  }

  return instance.post(url, { ...data }).then(async (response) => {
    return response as unknown as IResponse<any>
  })
}

export const wrapperPost: MethodPost<any, any> = async ({ url, body }) => {
  const endpoint = new URL(`${URL_API}${url}`)

  const requestInit: RequestInit = {
    method: "POST",
    headers: instanceHeader() as HeadersInit,
  }

  if (body) {
    requestInit.body = JSON.stringify(body)
  }

  return returnWrapper(endpoint, requestInit)
}
