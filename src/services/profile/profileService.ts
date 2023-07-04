import type { TProfileService, IPostProfileData, IGetProfilesResponse, IProfileResponse, IGetProfileIdResponse } from "./types/profileService"

import { wrapperFetch } from "@/services/requestsWrapper/wrapperFetch"

export const profileService: TProfileService = {
  async getProfiles(value) {
    return wrapperFetch.methodGet<IGetProfilesResponse>("/profiles", value)
  },
  async getProfileId(id) {
    return wrapperFetch.methodGetId<IGetProfileIdResponse>("/profiles", id)
  },
  async postProfile(value) {
    return wrapperFetch.methodPost<IPostProfileData, IProfileResponse>("/profiles", value)
  },
  async patchProfile(value, id) {
    return wrapperFetch.methodPatch<IPostProfileData, IProfileResponse>("/profiles", value, id)
  },
  async deleteProfile(id) {
    return wrapperFetch.methodDelete<IProfileResponse>("/profiles", id)
  },
}