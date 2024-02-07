import type { IBartersService } from "./types"

import { wrapperGet, wrapperGetId, wrapperPatch, wrapperPost } from "@/services/requestsWrapper"

const url = "/barters"

export const getBarters: IBartersService["get"] = (query) => wrapperGet({ url, query })
export const getBarterId: IBartersService["getId"] = (id) => wrapperGetId({ url, id })
export const getBarterUserIdInitiator: IBartersService["getUserId"] = (id, query) => wrapperGetId({ url: `${url}/initiator`, id, query })
export const getBarterUserIdReceiver: IBartersService["getReceiverId"] = (id, query) => wrapperGetId({ url: `${url}/receiver`, id, query })
export const postBarter: IBartersService["post"] = (body) => wrapperPost({ url, body })
export const patchBarter: IBartersService["patch"] = (body, id) => wrapperPatch({ url, body, id })
