import type { IServiceComplains } from "./types"

import { wrapperPost } from ".."

const url = "/complains"

export const serviceComplains: IServiceComplains = {
  post: (body) => wrapperPost({ url, body }),
}
