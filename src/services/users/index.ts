import type { IServiceUser } from "./types"

import { wrapperGet, wrapperGetId, wrapperPost, wrapperPatch, wrapperDelete } from "@/services/requestsWrapper"

const url = "/user"

export const serviceUser: IServiceUser = {
  get: () => wrapperGet({ url }),
  getId: (id) => wrapperGetId({ url, id }),
  post: (body) => wrapperPost({ url, body }),
  getEmail: (query) => wrapperGetId({ url: `${url}/email`, id: query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
  delete: (id) => wrapperDelete({ url, id }),
}
