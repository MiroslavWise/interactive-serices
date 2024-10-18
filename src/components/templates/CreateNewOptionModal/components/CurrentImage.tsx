import { useEffect, useRef } from "react"
import { type ControllerRenderProps } from "react-hook-form"

import { ImageStatic } from "@/components/common"
import IconTrashBlack from "@/components/icons/IconTrashBlack"

import { cx } from "@/lib/cx"

interface IProps {
  item: string
  index: number
  field: ControllerRenderProps<any, "file">

  progress: number | null
}

function deletePhoto(values: { file: File[]; string: string[] }, index: number) {
  return {
    file: values.file.filter((_, i) => index !== i),
    string: values.string.filter((_, i) => index !== i),
  }
}

function CurrentImage({ field, item, index, progress }: IProps) {
  const refArticle = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (progress !== null) {
      if (refArticle.current) {
        refArticle.current.style.opacity = `1`
        refArticle.current.style.visibility = `visible`
        refArticle.current.style.setProperty("--p", `${progress || 0}`)
      }
    }
  }, [progress])

  return (
    <div
      data-image
      data-current
      className={cx("w-full h-auto rounded-2xl bg-BG-second flex items-center justify-center relative overflow-hidden")}
    >
      <ImageStatic data-img src={item! as string} alt="offer" width={304} height={392} />
      <button
        type="button"
        data-trash
        onClick={() => {
          const deleteData = deletePhoto(field.value, index)
          field.onChange(deleteData)
        }}
      >
        <IconTrashBlack />
      </button>
      <article ref={refArticle} />
    </div>
  )
}

CurrentImage.displayName = "CurrentImage"
export default CurrentImage
