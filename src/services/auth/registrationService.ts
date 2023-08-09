import type { IRegistrationService, IResponseDataRegistration } from "./types/registrationService"

import { usersService } from "@/services/users"
import { wrapperFetch } from "@/services/requestsWrapper"
import env from "@/config/environment"

export const RegistrationService: IRegistrationService = {
  async registration(data) {
    return usersService.postUser(data)
      .then(response => {
        console.log("env.auto_verification: ", env.auto_verification)
        console.log("response registration: ", response)
        if (response.ok && response?.res?.confirmation_code && env.auto_verification) {
          return this.verification({ code: response?.res?.confirmation_code })
        } else if (response.ok && response?.res?.confirmation_code && !env.auto_verification) {
          return {
            ok: true,
            error: null,
            res: response?.res,
          }
        }
        return {
          ok: false,
          error: response?.error,
          code: response?.code,
        }
      })
  },
  async verification(value) {
    return wrapperFetch.methodPost<{ code: string }, IResponseDataRegistration>("/auth/verify", value)
      .then(response => {
        console.log("response verification: ", response)
        if (response.ok) {
          return {
            ok: true,
            res: response?.res,
            error: null,
          }
        }
        return {
          ok: false,
          res: response?.res,
          error: response?.error,
          code: response?.error?.code
        }
      })
  }
}