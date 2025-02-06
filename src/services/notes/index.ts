import { IQueriesNotes, TDeleteNote, TGetNotes, TPatchNote, type TPostNote } from "./types"

import { fetchGet, post, wrapperDelete, wrapperPatch } from "../request"

const url = "/notes"

export const postNote: TPostNote = (body) => post({ url, body })
export const patchNote: TPatchNote = (id: number, body) => wrapperPatch({ url, id, body })
export const getNotes: TGetNotes = (query?: IQueriesNotes) => fetchGet({ url, query })
export const deleteNote: TDeleteNote = (id) => wrapperDelete({ url, id })
