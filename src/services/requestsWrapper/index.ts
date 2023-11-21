import { URL_API } from "@/helpers"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"
import type { IWrapperFetch } from "./types/wrapperFetch"

export const wrapperFetch: IWrapperFetch = {
    async methodGet(url, query) {
        const params: string = query
            ? Object.entries(query)
                  .map(([key, value]) => `&${key}=${value}`)
                  .join("")
                  .replace("&", "?")
            : ""
        try {
            const response = await fetch(`${URL_API}${url}${params}`, {
                method: "GET",
                headers: useTokenHelper.authToken
                    ? {
                          Authorization: `Bearer ${useTokenHelper.authToken}`,
                          "Content-Type": "application/json",
                      }
                    : {
                          "Content-Type": "application/json",
                    },
                cache: "default"
            })
            const responseData = await response.json()
            return {
                ok: !!responseData?.data,
                res: responseData?.data,
                meta: responseData?.meta,
                error: responseData?.error,
                code: responseData?.error?.code,
            }
        } catch (e) {
            return {
                ok: false,
                error: e,
            }
        }
    },
    async methodGetId(url, id, query) {
        const params: string = query
            ? Object.entries(query)
                  .map(([key, value]) => `&${key}=${value}`)
                  .join("")
                  .replace("&", "?")
            : ""
        try {
            const response = await fetch(`${URL_API}${url}/${id}${params}`, {
                method: "GET",
                headers: useTokenHelper.authToken
                    ? {
                          Authorization: `Bearer ${useTokenHelper.authToken}`,
                          "Content-Type": "application/json",
                      }
                    : {
                          "Content-Type": "application/json",
                    },
                    cache: "default"
            })
            const responseData = await response.json()
            return {
                ok: !!responseData?.data,
                res: responseData?.data,
                meta: responseData?.meta,
                error: responseData?.error,
                code: responseData?.error?.code,
            }
        } catch (e) {
            return {
                ok: false,
                error: e,
            }
        }
    },
    async methodPost(url, body) {
        try {
            const response = await fetch(`${URL_API}${url}`, {
                method: "POST",
                headers: useTokenHelper.authToken
                    ? {
                          Authorization: `Bearer ${useTokenHelper.authToken}`,
                          "Content-Type": "application/json",
                      }
                    : {
                          "Content-Type": "application/json",
                      },
                body: JSON.stringify(body),
            })
            const responseData = await response.json()
            return {
                ok: !!responseData?.data,
                res: responseData?.data,
                meta: responseData?.meta,
                error: responseData?.error,
                code: responseData?.error?.code,
            }
        } catch (e) {
            return {
                ok: false,
                error: e,
            }
        }
    },
    async methodPatch(url, body, id) {
        try {
            const response = await fetch(`${URL_API}${url}/${id}`, {
                method: "PATCH",
                headers: useTokenHelper.authToken
                    ? {
                          Authorization: `Bearer ${useTokenHelper.authToken}`,
                          "Content-Type": "application/json",
                      }
                    : {
                          "Content-Type": "application/json",
                      },
                body: JSON.stringify(body),
            })
            const responseData = await response.json()
            return {
                ok: !!responseData?.data,
                res: responseData?.data,
                error: responseData?.error,
                meta: responseData?.meta,
                code: responseData?.error?.code,
            }
        } catch (e) {
            return {
                ok: false,
                error: e,
            }
        }
    },
    async methodDelete(url, id) {
        try {
            const response = await fetch(`${URL_API}${url}/${id}`, {
                method: "DELETE",
                headers: useTokenHelper.authToken
                    ? {
                          Authorization: `Bearer ${useTokenHelper.authToken}`,
                          "Content-Type": "application/json",
                      }
                    : {
                          "Content-Type": "application/json",
                      },
            })
            const responseData = await response.json()
            if (responseData?.error === null) {
                return {
                    ok: true,
                    res: responseData?.data,
                }
            }
            return {
                ok: false,
                error: responseData?.error,
            }
        } catch (e) {
            return {
                ok: false,
                error: e,
            }
        }
    },
    async methodUploadFile(url, formData) {
        try {
            if (!useTokenHelper.authToken) {
                return {
                    ok: false,
                    error: "Not Authorization",
                }
            }
            const response = await fetch(`${URL_API}${url}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${useTokenHelper.authToken}`,
                },
                body: formData,
            })
            const responseData = await response.json()
            return {
                ok: !!responseData?.data,
                res: responseData?.data,
                error: responseData?.error,
                meta: responseData?.meta,
            }
        } catch (e) {
            return {
                ok: false,
                error: e,
            }
        }
    },
}
