import { IImageData } from "@/types/type"

interface IData {
  /** Новые файлы */
  files: File[]
  /** Прежние файлы */
  images: IImageData[]
  /** Удаляемые файлы */
  deleteIdPhotos: number[]
}

function updateImageOffer() {}
