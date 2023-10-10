import type {
    IServiceProfile,
    IPostProfileData,
    IProfileResponse,
    IGetProfileIdResponse,
    IPatchProfileData,
} from "./types/profileService"
import { wrapperFetch } from "@/services/requestsWrapper"

export const serviceProfile: IServiceProfile = {
    route: "/profiles",
    get(value) {
        return wrapperFetch.methodGet<IGetProfileIdResponse[]>(
            this.route,
            value,
        )
    },
    getId(id) {
        return wrapperFetch.methodGetId<IGetProfileIdResponse>(this.route, id)
    },
    getUserId(userId) {
        return wrapperFetch.methodGetId<IGetProfileIdResponse>(
            `${this.route}/user_id`,
            userId,
        )
    },
    post(value) {
        return wrapperFetch.methodPost<IPostProfileData, IProfileResponse>(
            this.route,
            value,
        )
    },
    patch(value, id) {
        return wrapperFetch.methodPatch<IPatchProfileData, IProfileResponse>(
            this.route,
            value,
            id,
        )
    },
    delete(id) {
        return wrapperFetch.methodDelete<IProfileResponse>(this.route, id)
    },
}
