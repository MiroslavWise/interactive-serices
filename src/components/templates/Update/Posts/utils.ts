import { type ChangeEvent } from "react"

import { type IBodyNote } from "@/services/notes/types"
import { type IBodyPost } from "@/services/posts/types"
import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { type TSchemaCreatePostUpdate } from "../../CreatePost/schema"

import { patchPost } from "@/services/posts"
import { patchNote } from "@/services/notes"
import { fileUploadService } from "@/services"
import { transliterateAndReplace } from "@/helpers"
import { createAddress } from "@/helpers/address/create"

interface IUpdate {
  id: number
  idNote: number
  userId: number
  images: number[]
  newValues: TSchemaCreatePostUpdate
  defaultValues: Omit<TSchemaCreatePostUpdate, "addressFeature">
}

export async function updatePatch({ id, idNote, userId, images, defaultValues, newValues }: IUpdate) {
  const dataPost: Partial<IBodyPost> = {}
  const dataNote: Partial<IBodyNote> = {}

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

  const files = newValues.file.file
  const newOldImages = images.filter((item) => !newValues.deletesImages.includes(item))

  if (files.length > 0 || newOldImages.length !== images.length) {
    const responseIds = await Promise.all(
      files.map((item) =>
        fileUploadService(item!, {
          type: EnumTypeProvider.NOTE,
          userId: userId!,
          idSupplements: idNote,
        }),
      ),
    )

    const ids = responseIds?.filter((item) => !!item?.data).map((item) => item.data?.id!)

    const list = [...newOldImages, ...ids].slice(0, 9)

    // if (list.length === 0) {
    //   dataNote.images = [null]
    // } else {
    // }
    dataNote.images = list
  }

  const oldUrgent = !!defaultValues.help
  const newUrgent = !!newValues.help

  if (oldUrgent !== newUrgent) {
    dataPost.urgent = newUrgent
  }

  const newAddressFeature = newValues?.addressFeature

  if (newAddressFeature) {
    const responseAddress = await createAddress(newAddressFeature, userId)

    const { id: addressId } = responseAddress.data ?? {}

    if (addressId) {
      dataPost.addresses = [addressId]
    }
  }

  return await Promise.all([
    Object.entries(dataPost).length > 0 ? patchPost(id, dataPost) : Promise.resolve(),
    Object.entries(dataNote).length > 0 ? patchNote(idNote, dataNote) : Promise.resolve(),
  ])
}

const sleep = () => new Promise((r) => setTimeout(r, 50))

export async function handleImageChange(
  current: {
    file: File[]
    string: string[]
  },
  event: ChangeEvent<HTMLInputElement>,
) {
  const files = event.target.files

  let filesReady = {
    file: [...current.file] as File[],
    string: [...current.string] as string[],
  }

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file) {
        if (file.size < 9.9 * 1024 * 1024) {
          const is = current.file.some((_) => _.size === file.size && _.name === file.name)

          if (is) {
            continue
          }

          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (f) {
            filesReady = {
              ...filesReady,
              file: [...filesReady.file, file],
              string: [...filesReady.string, f!.target!.result as string],
            }
          }
        }
      }
    }
  }

  await sleep()

  return Promise.resolve({
    file: filesReady.file.splice(0, 9),
    string: filesReady.string.splice(0, 9),
  })
}
