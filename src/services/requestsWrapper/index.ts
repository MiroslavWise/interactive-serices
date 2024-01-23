import { URL_API } from "@/helpers"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"
import type { IWrapperFetch } from "./types"

export const wrapperFetch: IWrapperFetch = {
    get header() {
        const head: HeadersInit = {
            "Content-Type": "application/json",
        }

        if (useTokenHelper.authToken) {
            if (head !== null && typeof head === "object") {
                head["Authorization"] = `Bearer ${useTokenHelper.authToken}`
            }
        }

        return head
    },

    returnData(response) {
        return {
            ok: !!response?.data,
            res: response?.data || null,
            meta: response?.meta || null,
            error: response?.error || response || null,
        }
    },

    returnError(error) {
        return {
            ok: false,
            res: null,
            meta: null,
            error: error,
        }
    },

    async methodGet(url, query) {
        const params: string = query
            ? Object.entries(query)
                  .reduce((prev, [key, value]) => prev + `&${key}=${value}`, ``)
                  .replace("&", "?")
            : ""

        const RequestInit: RequestInit = {
            method: "GET",
            headers: this.header,
            cache: "default",
        }

        try {
            const response = await fetch(`${URL_API}${url}${params}`, RequestInit)
            const responseData = await response.json()
            return this.returnData(responseData)
        } catch (e) {
            return this.returnError(e)
        }
    },
    async methodGetId(url, id, query) {
        const params: string =
            typeof query === "string"
                ? query
                : query
                ? Object.entries(query)
                      .reduce((prev, [key, value]) => prev + `&${key}=${value}`, ``)
                      .replace("&", "?")
                : ""

        const requestInit: RequestInit = {
            method: "GET",
            headers: this.header,
            cache: "default",
        }
        try {
            const response = await fetch(`${URL_API}${url}/${id}${params}`, requestInit)
            const responseData = await response.json()
            return this.returnData(responseData)
        } catch (e) {
            return this.returnError(e)
        }
    },
    async methodPost(url, body) {
        const requestInit: RequestInit = {
            method: "POST",
            headers: this.header,
            cache: "default",
        }
        if (body) {
            requestInit.body = JSON.stringify(body)
        }
        try {
            const response = await fetch(`${URL_API}${url}`, requestInit)
            const responseData = await response.json()
            return this.returnData(responseData)
        } catch (e) {
            return this.returnError(e)
        }
    },
    async methodPatch(url, body, id) {
        try {
            const response = await fetch(`${URL_API}${url}/${id}`, {
                method: "PATCH",
                headers: this.header,
                body: JSON.stringify(body),
            })
            const responseData = await response.json()
            return this.returnData(responseData)
        } catch (e) {
            return this.returnError(e)
        }
    },
    async methodDelete(url, id) {
        try {
            const response = await fetch(`${URL_API}${url}/${id}`, {
                method: "DELETE",
                headers: this.header,
            })
            const responseData = await response.json()
            return this.returnData(responseData)
        } catch (e) {
            return this.returnError(e)
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
            return this.returnData(responseData)
        } catch (e) {
            return this.returnError(e)
        }
    },
    stringRequest(value: string) {
        return `${URL_API}/${value}`
    },
}

class wrapperRequest {
    private _url: string = URL_API
    private _token: string = useTokenHelper.authToken!
    private _link!: string
    private _params!: string

    private async blockTryCatch(method: RequestInit["method"], params: string) {
        try {
            const response = await fetch(`${this._url}${this._link}${params}`, {
                method: method,
                headers: {
                    Authorization: this._token ? `Bearer ${this._token}` : "",
                    "Content-Type": "application/json",
                },
            })
            const responseData = await response.json()
            return {}
        } catch (e) {}
    }

    private methodGet(params: string) {}

    constructor(link: string) {
        this._link = link
    }

    get(query?: Record<string, any>) {
        const params: string = query
            ? Object.entries(query)
                  .reduce((prev, [key, value]) => prev + `&${key}=${value}`, ``)
                  .replace("&", "?")
            : ""
    }
}
