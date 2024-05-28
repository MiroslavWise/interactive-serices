import type { IServiceAddresses } from "./types/serviceAddresses"

import { wrapperPost, wrapperPatch, get } from "@/services"

const url = "/addresses"

export const serviceAddresses: IServiceAddresses = {
  route: "/addresses",
  get: (query) => get({ url, query }),
  getId: (id) => get({ url: `${url}/${id}` }),
  getHash: (hash) => get({ url: `${url}/hash/${hash}` }),
  post(body) {
    return wrapperPost({ url: this.route, body })
  },
  patch(body, id) {
    return wrapperPatch({ url: this.route, body, id })
  },
}
