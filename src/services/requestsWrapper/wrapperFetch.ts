import { URL_API } from "@/helpers"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"
import type { IWrapperFetch } from "./types/wrapperFetch"

export const wrapperFetch: IWrapperFetch = {
  async methodGet(url, query) {
    const params: string = Object.entries(query)
      .map(([key, value]) => `&${key}=${value}`)
      .join("")
      .replace("&", "?")
    try {
      const response = await fetch(`${URL_API}${url}${params}`, {
        method: "GET",
        headers: useTokenHelper.isAuth ? {
          "Authorization": `Bearer ${useTokenHelper.authToken}`,
          "Content-Type": "application/json",
        } : {
          "Content-Type": "application/json",
        },
      })
      const responseData = await response.json()
      if (responseData?.error === null) {
        return {
          ok: true,
          res: responseData,
        }
      }
      return {
        ok: false,
        res: responseData,
        error: responseData?.error,
      }
    } catch (e) {
      return {
        ok: false,
        error: e,
      }
    }
  },
  async methodGetId(url, id) {
    try {
      const response = await fetch(`${URL_API}${url}/${id}`, {
        method: "GET",
        headers: useTokenHelper.isAuth ? {
          "Authorization": `Bearer ${useTokenHelper.authToken}`,
          "Content-Type": "application/json",
        } : {
          "Content-Type": "application/json",
        },
      })
      const responseData = await response.json()
      if (responseData?.error === null) {
        return {
          ok: true,
          res: responseData,
        }
      }
      return {
        ok: false,
        res: responseData,
        error: responseData?.error,
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
        headers: useTokenHelper.isAuth ? {
          "Authorization": `Bearer ${useTokenHelper.authToken}`,
          "Content-Type": "application/json",
        } : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })
      const responseData = await response.json()
      if (responseData?.error === null) {
        return {
          ok: true,
          res: responseData,
        }
      }
      return {
        ok: false,
        res: responseData,
        error: responseData?.error,
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
        headers: useTokenHelper.isAuth ? {
          "Authorization": `Bearer ${useTokenHelper.authToken}`,
          "Content-Type": "application/json",
        } : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })
      const responseData = await response.json()
      if (responseData?.error === null) {
        return {
          ok: true,
          res: responseData,
        }
      }
      return {
        ok: false,
        res: responseData,
        error: responseData?.error,
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
        headers: useTokenHelper.isAuth ? {
          "Authorization": `Bearer ${useTokenHelper.authToken}`,
          "Content-Type": "application/json",
        } : {
          "Content-Type": "application/json",
        },
      })
      const responseData = await response.json()
      if (responseData?.error === null) {
        return {
          ok: true,
          res: responseData,
        }
      }
      return {
        ok: false,
        res: responseData,
        error: responseData?.error,
      }
    } catch (e) {
      return {
        ok: false,
        error: e,
      }
    }
  },
}