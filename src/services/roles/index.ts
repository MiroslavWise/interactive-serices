import { type TRole } from "./types"

import { fetchGet } from "../request"

const url = "/roles"

export const getRoles = () => fetchGet<TRole[]>({ url })
