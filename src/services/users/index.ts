import type { IResponseDataRegistration } from "@/services/auth/types/registrationService"
import type { IResponseUsers, IUserResponse, IUsersResponse, IPostDataUser, IPatchDataUser } from "./types/usersService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const usersService: IResponseUsers = {
  route: "/users",
  async getUsers(value) {
    return wrapperFetch.methodGet<IUsersResponse>(this.route, value)
  },
  async getUserId(id){
    return wrapperFetch.methodGetId<IUserResponse>(this.route, id)
  },
  async postUser(value){
    return wrapperFetch.methodPost<IPostDataUser, IResponseDataRegistration>(this.route, value)
  },
  async patchUser(value, id){
    return wrapperFetch.methodPatch<IPatchDataUser, IUserResponse>(this.route, value, id)
  },
  async deleteUser(id){
    return wrapperFetch.methodDelete<IUserResponse>(this.route, id)
  },
}