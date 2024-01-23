import { URL_API } from "@/helpers"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"
import type { IWrapperFetch } from "./types/wrapperFetch"
// import type { IBarterResponse } from "../barters/types"

export const wrapperFetch: IWrapperFetch = {
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

        const Headers: HeadersInit = {
            "Content-Type": "application/json",
        }

        if (useTokenHelper.authToken) {
            if (Headers !== null && typeof Headers === "object") {
                Headers["Authorization"] = `Bearer ${useTokenHelper.authToken}`
            }
        }

        const RequestInit: RequestInit = {
            method: "GET",
            headers: Headers,
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
            headers: useTokenHelper.authToken
                ? {
                      Authorization: `Bearer ${useTokenHelper.authToken}`,
                      "Content-Type": "application/json",
                  }
                : {
                      "Content-Type": "application/json",
                  },
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
            headers: useTokenHelper.authToken
                ? {
                      Authorization: `Bearer ${useTokenHelper.authToken}`,
                      "Content-Type": "application/json",
                  }
                : {
                      "Content-Type": "application/json",
                  },
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
            return this.returnData(responseData)
        } catch (e) {
            return this.returnError(e)
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

// let barter!: IBarterResponse

//delete feature

// function asdf() {
//     //1-й вариант
//     if (["completed", "destroyed"].includes(barter.status!)) {
//         const notifyType: Partial<Record<IBarterResponse["status"], string>> = {
//             completed: "completion-recall",
//             destroyed: "completion-recall-no",
//         }

//         if (barter.userId === barter.initiator.userId) {
//             await this.notify(barter.consigner.userId, "barter", notifyType[barter.status], barter)
//         } else if (barter.userId === barter.consigner.userId) {
//             await this.notify(barter.initiator.userId, "barter", notifyType[barter.status], barter)
//         }
//     }

//     //2-й вариант
//     if (barter.userId === barter.initiator.userId) {
//         if (barter.status === "completed") {
//             await this.notify(barter.consigner.userId, "barter", "completion-recall", barter)
//         }
//         if (barter.status === "destroyed") {
//             await this.notify(barter.consigner.userId, "barter", "completion-recall-no", barter)
//         }
//     }

//     if (barter.userId === barter.consigner.userId) {
//         if (barter.status === "completed") {
//             await this.notify(barter.initiator.userId, "barter", "completion-recall", barter)
//         }
//         if (barter.status === "destroyed") {
//             await this.notify(barter.initiator.userId, "barter", "completion-recall-no", barter)
//         }
//     }
// }
