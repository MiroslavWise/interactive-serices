import type { TProfileService, IPostProfileData, IGetProfilesResponse, IProfileResponse, IGetProfileIdResponse } from "./types/profileService"
import { wrapperFetch } from "@/services/requestsWrapper"

export const profileService: TProfileService = {
  route: "/profiles",
  async getProfiles(value) {
    return wrapperFetch.methodGet<IGetProfilesResponse>(this.route, value)
  },
  async getProfileId(id) {
    return wrapperFetch.methodGetId<IGetProfileIdResponse>(this.route, id)
  },
  async getProfileThroughUserId(userId) {
    return wrapperFetch.methodGetId<IGetProfileIdResponse>(`${this.route}/user_id`, userId)
  },
  async postProfile(value) {
    return wrapperFetch.methodPost<IPostProfileData, IProfileResponse>(this.route, value)
  },
  async patchProfile(value, id) {
    return wrapperFetch.methodPatch<IPostProfileData, IProfileResponse>(this.route, value, id)
  },
  async deleteProfile(id) {
    return wrapperFetch.methodDelete<IProfileResponse>(this.route, id)
  },
}