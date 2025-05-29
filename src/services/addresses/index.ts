import type { IServiceAddresses } from "./types/serviceAddresses"

import { fetchGet, post } from "@/services"

const url = "/addresses"

export const getHashAddress: IServiceAddresses["getHash"] = (hash) => fetchGet({ url: `${url}/hash/${hash}` })
export const postAddress: IServiceAddresses["post"] = (body) => post({ url: url, body }, true)
