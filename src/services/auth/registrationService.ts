import type {
    IRegistrationService,
    IResponseDataRegistration,
} from "./types/registrationService"

import { usersService } from "@/services/users"
import { wrapperFetch } from "@/services/requestsWrapper"

export const RegistrationService: IRegistrationService = {
    async registration(data) {
        return usersService.post(data).then((response) => {
            // if (response.ok && response?.res?.confirmation_code) {
            //   return this.verification({ code: response?.res?.confirmation_code })
            // }
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
                code: response?.code,
            }
        })
    },
    async verification(value) {
        return wrapperFetch
            .methodPost<{ code: string }, IResponseDataRegistration>(
                "/auth/verify",
                value,
            )
            .then((response) => {
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
                    code: response?.error?.code,
                }
            })
    },
}
