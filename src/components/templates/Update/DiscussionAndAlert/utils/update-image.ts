import { fileUploadService } from "@/services/file-upload"
import { patchOffer } from "@/services/offers"
import { IPatchOffers } from "@/services/offers/types"
import { EnumTypeProvider } from "@/types/enum"
import { IImageData } from "@/types/type"

interface IData {
  id: number
  userId: number
  /** Новые файлы */
  files: File[]
  /** Прежние файлы */
  images: IImageData[]
  /** Удаляемые файлы */
  deleteIdPhotos: number[]
  provider: EnumTypeProvider
}

export async function updateImageOffer({ images, deleteIdPhotos, userId, files, id, provider }: IData) {
  const body: IPatchOffers = {}

  const photos = [...images.map((item) => item.id).filter((item) => !deleteIdPhotos?.includes(item))]

  if (files.length > 0) {
    const responses = await Promise.all([
      ...files.map((item) =>
        fileUploadService(item!, {
          type: provider,
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

  if (Object.entries(body).length > 0) {
    return patchOffer(body, id)
  } else {
    return Promise.resolve({ ok: "not update" as const })
  }
}
