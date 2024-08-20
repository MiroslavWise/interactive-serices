import type { IServiceComplains, TGetComplains } from "./types"

import { fetchGet, post } from ".."

const url = "/complains"

export const postComplain: IServiceComplains["post"] = (body) => post({ url, body })
export const getComplains: TGetComplains = ({ query }) => fetchGet({ url, query })
