import type { IResponseDataRegistration } from "@/services/auth/types/registrationService"
import type { IResponseUsers, IUserResponse, IPostDataUser, IPatchDataUser } from "./types/usersService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const usersService: IResponseUsers = {
  route: "/users",
  getUsers(value) {
    return wrapperFetch.methodGet<IUserResponse[]>(this.route, value)
  },
  getUserId(id){
    return wrapperFetch.methodGetId<IUserResponse>(this.route, id)
  },
  postUser(value){
    return wrapperFetch.methodPost<IPostDataUser, IResponseDataRegistration>(this.route, value)
  },
  patchUser(value, id){
    return wrapperFetch.methodPatch<IPatchDataUser, IUserResponse>(this.route, value, id)
  },
  deleteUser(id){
    return wrapperFetch.methodDelete<IUserResponse>(this.route, id)
  },
}