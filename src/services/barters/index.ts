import type {
  IBartersService,
  IBartersResponse,
  IBarterResponse,
  IPostDataBarter,
  IPatchDataBarter,
} from "./types/bartersService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const bartersService: IBartersService = {
  route: "/barters",
  getBarters(value){
    return wrapperFetch.methodGet<IBartersResponse>(this.route, value)
  },
  getBarterId(id){
    return wrapperFetch.methodGetId<IBarterResponse>(this.route, id)
  },
  postBarter(value){
    return wrapperFetch.methodPost<IPostDataBarter,IBarterResponse>(this.route, value)
  },
  patchBarter(value, id){
    return wrapperFetch.methodPatch<IPatchDataBarter, IBarterResponse>(this.route, value, id)
  },
  deleteBarter(id){
    return wrapperFetch.methodDelete<IBarterResponse>(this.route, id)
  },
}