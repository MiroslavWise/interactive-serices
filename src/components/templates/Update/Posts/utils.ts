import { type IBodyNote } from "@/services/notes/types"
import { type IBodyPost } from "@/services/posts/types"
import { type TSchemaCreatePostUpdate } from "../../CreatePost/schema"

import { clg } from "@console"
import { patchNote } from "@/services/notes"
import { patchPost } from "@/services/posts"
import { transliterateAndReplace } from "@/helpers"

interface IUpdate {
  id: number
  idNote: number
  newValues: TSchemaCreatePostUpdate
  defaultValues: Omit<TSchemaCreatePostUpdate, "addressFeature">
}

export async function updatePatch({ id, idNote, defaultValues, newValues }: IUpdate) {
  const dataPost: Partial<IBodyPost> = {}
  const dataNote: Partial<IBodyNote> = {}

  clg("updatePatch: defaultValues", defaultValues, "warning")
  clg("updatePatch: newValues", newValues, "warning")

  const oldTitle = defaultValues.title
  const newTitle = newValues.title.trim().slice(0, 254)

  if (oldTitle !== newTitle && !!newTitle) {
    dataPost.title = newTitle
    dataPost.slug = transliterateAndReplace(newTitle)
  }

  const oldDescription = defaultValues.description
  const newDescription = newValues.description.trim()

  if (oldDescription !== newDescription && !!newDescription) {
    dataNote.description = newDescription
  }

  return await Promise.all([
    Object.entries(dataPost).length > 0 ? patchPost(id, dataPost) : Promise.resolve(),
    Object.entries(dataNote).length > 0 ? patchNote(idNote, dataNote) : Promise.resolve(),
  ])
}
