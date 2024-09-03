import { TDeleteNote, TGetNotes, TPatchNote, type TPostNote } from "./types"

import { fetchGet, patch, post, wrapperDelete } from "../request"

const url = "/notes"

export const postNote: TPostNote = (body) => post({ url, body })
export const patchNote: TPatchNote = (id: number, body) => patch({ url: `${url}/${id}`, body })
export const getNotes: TGetNotes = (query) => fetchGet({ url, query })
export const deleteNote: TDeleteNote = (id) => wrapperDelete({ url, id })
