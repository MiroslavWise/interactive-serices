import { IImageData } from "@/types/type"
import { TSchemaUpdateOffer } from "./types"
import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { IPatchOffers, IResponseOffers } from "@/services/offers/types"

import { createAddress } from "@/helpers/address/create"
import { fileUploadService, patchOffer } from "@/services"

interface IData {
  values: TSchemaUpdateOffer
  defaults: IResponseOffers
  userId: number

  /** Новые файлы */
  files: File[]
  /** Прежние файлы */
  images: IImageData[]
  /** Удаляемые файлы */
  deleteIdPhotos: number[]
}

export async function updateOffer({ values, defaults, files, images, deleteIdPhotos, userId }: IData) {
  const id = defaults.id

  const body: IPatchOffers = {}

  const newDescription = values.description.trim()
  const oldDescription = defaults.description
  if (newDescription !== oldDescription && !!newDescription) {
    body.description = newDescription
  }

  const newTitle = values.title.trim()
  const oldTitle = defaults.title
  if (newTitle !== oldTitle && !!newTitle) {
    body.title = newTitle
  }

  const newHelp = !!values.help
  const oldHelp = !!defaults.urgent
  if (newHelp !== oldHelp) {
    body.urgent = newHelp ? EnumHelper.HELP_KURSK : ""
  }

  const photos = [...images.map((item) => item.id).filter((item) => !deleteIdPhotos?.includes(item))]

  if (files.length > 0) {
    const responses = await Promise.all([
      ...files.map((item) =>
        fileUploadService(item!, {
          type: EnumTypeProvider.offer,
          userId: userId!,
          idSupplements: id!,
        }),
      ),
    ])
    if (responses?.some((item) => !!item.data)) {
      responses
        ?.map((item) => item?.data)
        ?.forEach((item) => {
          if (!!item?.id) {
            photos.push(item?.id!)
          }
        })
    }
  }

  if (files.length > 0 || deleteIdPhotos.length > 0) {
    if (JSON.stringify(photos.toSorted()) !== JSON.stringify(images.map((item) => item.id).toSorted())) {
      body.images = [...photos]
    }
  }

  if (!!values.address) {
    if (typeof values.address === "object") {
      if (!!values.address?.GeoObject) {
        const { data } = await createAddress(values.address, userId!)
        if (data?.id) {
          body.addresses = [data?.id!]
        }
      }
    }
  }

  if (Object.entries(body).length > 0) {
    return patchOffer(body, id)
  } else {
    return Promise.resolve({ ok: "not update" as const })
  }
}
