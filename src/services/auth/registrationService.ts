import type { IResponseLoginNot2fa } from "./types/authService"
import type { IRegistrationService } from "./types/registrationService"

import { serviceUser, wrapperFetch } from "@/services"

export const RegistrationService: IRegistrationService = {
    async registration(data) {
        return serviceUser.post({ ...data, agree: true }).then((response) => {
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
    async verification(value) {
        return wrapperFetch.methodPost<{ code: string }, IResponseLoginNot2fa>("/auth/verify", value).then((response) => {
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
