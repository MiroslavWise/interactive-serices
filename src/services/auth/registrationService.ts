import type { IRegistrationService, IResponseDataRegistration } from "./types/registrationService"

import { usersService } from "@/services/users"
import { wrapperFetch } from "@/services/requestsWrapper"
import env from "@/config/environment"

export const RegistrationService: IRegistrationService = {
  registration(data) {
    return usersService.postUser(data)
      .then(response => {
        if (!response?.error && response?.res?.confirmation_code && env.auto_verification) {
          return this.verification({ code: response?.res?.confirmation_code })
        } else if (!response?.error && response?.res?.confirmation_code && !env.auto_verification) {
          return {
            ok: true,
            error: null,
          }
        }
        return {
          ok: false,
          error: response?.error,
          code: response?.code,
        }
      })
  },
  verification(value) {
    return wrapperFetch.methodPost<{ code: string }, IResponseDataRegistration>("", value)
      .then(response => {
        if (response?.error === null && !!response?.res?.id) {
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