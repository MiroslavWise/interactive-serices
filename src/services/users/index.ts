import type { IResponseDataRegistration } from "@/services/auth/types/registrationService"
import type {
    IServiceUsers,
    IUserResponse,
    IPostDataUser,
    IPatchDataUser,
} from "./types/usersService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const usersService: IServiceUsers = {
    route: "/users",
    get(value) {
        return wrapperFetch.methodGet<IUserResponse[]>(this.route, value)
    },
    getId(id) {
        return wrapperFetch.methodGetId<IUserResponse>(this.route, id)
    },
    post(value) {
        return wrapperFetch.methodPost<
            IPostDataUser,
            IResponseDataRegistration
        >(this.route, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch<IPatchDataUser, IUserResponse>(
            this.route,
            value,
            id,
        )
    },
    delete(id) {
        return wrapperFetch.methodDelete<IUserResponse>(this.route, id)
    },
}
