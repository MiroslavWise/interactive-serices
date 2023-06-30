import type { IDataRegistration, IReturnDataRegistration } from "../types/registrationService"

import env from "@/config/environment"
import { URL_API } from "@/helpers/url"

export async function registration({ email, password, repeat }: IDataRegistration): Promise<IReturnDataRegistration> {
  try {
    const data = { email, password, repeat }
    const res = await fetch(`${URL_API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const dataResponse = await res.json()
    console.log("dataResponse: ", dataResponse)
    if (dataResponse?.error && dataResponse?.error?.code === 409) {
      return {
        registration: false,
        code: 409,
        error: dataResponse?.error,
      }
    }
    if (!dataResponse?.error && dataResponse?.result?.confirmation_code && env.auto_verification) {
      return verification(dataResponse?.result?.confirmation_code)
    } else if (!dataResponse?.error && dataResponse?.result?.confirmation_code && !env.auto_verification) {
      return {
        registration: true,
        error: null,
        need_verify: true,
      }
    } else {
      return {
        registration: false,
        error: dataResponse?.error,
      }
    }
  } catch (e) {
    return {
      registration: false,
      error: e
    }
  }
}

async function verification(value: string): Promise<IReturnDataRegistration> {
  try {
    const data = { code: value }
    const res = await fetch(`${URL_API}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const dataResponse = await res.json()
    console.log(" ---verify--- ", dataResponse)
    if (dataResponse?.error === null && !!dataResponse?.result?.id) {
      return {
        registration: true,
        error: null,
      }
    } else if (dataResponse?.error?.code === 401) {
      return {
        registration: false,
        error: dataResponse?.error,
        message: dataResponse?.error?.message,
      }
    } else if (dataResponse?.error?.code === 404) {
      return {
        registration: false,
        error: dataResponse?.error,
        message: dataResponse?.error?.message,
      }
    } else if (dataResponse?.error?.code === 500) {
      return {
        registration: false,
        error: dataResponse?.error,
        message: dataResponse?.error?.message,
      }
    } else {
      return {
        registration: false,
        error: dataResponse?.error,
        message: dataResponse?.error?.message,
      }
    }
  } catch (e) {
    console.error("ERROR VERIFY REQUEST: ", e)
    return {
      registration: false,
      error: e,
      message: "error request",
    }
  }
}