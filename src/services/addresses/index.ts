import type { IServiceAddresses } from "./types/serviceAddresses"

import { wrapperGet, wrapperGetId, wrapperPost, wrapperPatch } from "@/services"

export const serviceAddresses: IServiceAddresses = {
  route: "/addresses",
  get(query) {
    return wrapperGet({ url: this.route, query })
  },
  getId(id) {
    return wrapperGetId({ url: this.route, id })
  },
  getHash(hash) {
    return wrapperGetId({ url: `${this.route}/hash`, id: hash })
  },
  post(body) {
    return wrapperPost({ url: this.route, body })
  },
  patch(body, id) {
    return wrapperPatch({ url: this.route, body, id })
  },
}
