import type { IRegistrationService } from "./types/registrationService"

import { postUser, wrapperPost } from "@/services"

export const RegistrationService: IRegistrationService = {
  async registration(data, urlSearchParams) {
    return postUser({ ...data, agree: true }, urlSearchParams).then((response) => {
      if (response.ok) {
        return {
          ok: response.ok,
          res: response?.res,
          meta: response?.meta,
        }
      }
      return {
        ok: false,
        error: response?.error,
      }
    })
  },
  async verification(body) {
    return wrapperPost({ url: "/auth/verify", body }).then((response) => {
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
      }
    })
  },
}
