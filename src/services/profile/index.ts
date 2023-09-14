import type {
    TProfileService,
    IPostProfileData,
    IProfileResponse,
    IGetProfileIdResponse,
    IPatchProfileData,
} from "./types/profileService"
import { wrapperFetch } from "@/services/requestsWrapper"

export const profileService: TProfileService = {
    route: "/profiles",
    getProfiles(value) {
        return wrapperFetch.methodGet<IGetProfileIdResponse[]>(
            this.route,
            value,
        )
    },
    getProfileId(id) {
        return wrapperFetch.methodGetId<IGetProfileIdResponse>(this.route, id)
    },
    getProfileThroughUserId(userId) {
        return wrapperFetch.methodGetId<IGetProfileIdResponse>(
            `${this.route}/user_id`,
            userId,
        )
    },
    postProfile(value) {
        return wrapperFetch.methodPost<IPostProfileData, IProfileResponse>(
            this.route,
            value,
        )
    },
    patchProfile(value, id) {
        return wrapperFetch.methodPatch<IPatchProfileData, IProfileResponse>(
            this.route,
            value,
            id,
        )
    },
    deleteProfile(id) {
        return wrapperFetch.methodDelete<IProfileResponse>(this.route, id)
    },
}
