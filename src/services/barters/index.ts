import type { IBartersService } from "./types"

import { get, wrapperPatch, wrapperPost, fetchGet } from "@/services/request"

const url = "/barters"

export const getBarters: IBartersService["get"] = (query) => fetchGet({ url, query })
export const getBarterId: IBartersService["getId"] = (id) => fetchGet({ url: `${url}/${id}` })
// export const getBarterUserIdInitiator: IBartersService["getUserId"] = (id, query) => get({ url: `${url}/initiator/${id}`, query })
export const getBarterUserIdReceiver: IBartersService["getReceiverId"] = (id, query) => get({ url: `${url}/receiver/${id}`, query })
export const postBarter: IBartersService["post"] = (body) => wrapperPost({ url, body })
export const patchBarter: IBartersService["patch"] = (body, id) => wrapperPatch({ url, body, id })
