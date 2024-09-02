import { TPatchNote, type TPostNote } from "./types"

import { patch, post } from "../request"

const url = "/notes"

export const postNote: TPostNote = (body) => post({ url, body })
export const patchNote: TPatchNote = (id: number, body) => patch({ url: `${url}/${id}`, body })
