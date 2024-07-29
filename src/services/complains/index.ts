import type { IServiceComplains } from "./types"

import { post } from ".."

const url = "/complains"

export const postComplain: IServiceComplains["post"] = (body) => post({ url, body })
