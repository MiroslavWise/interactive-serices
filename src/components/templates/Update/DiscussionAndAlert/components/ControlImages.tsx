import { Dispatch, SetStateAction } from "react"

import { IImageData } from "@/types/type"

import { NextImageMotion } from "@/components/common/Image"
import { IconSprite } from "@/components/icons/icon-sprite"
import { UploadPhoto } from "@/components/common/custom/UploadPhoto"

interface IProps {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
  strings: string[]
  setStrings: Dispatch<SetStateAction<string[]>>
  deleteIdPhotos: number[]
  setDeleteIdPhotos: Dispatch<SetStateAction<number[]>>
  photos: IImageData[]
}

function ControlImages({ files, strings, photos, deleteIdPhotos, setDeleteIdPhotos, setFiles, setStrings }: IProps) {
  function deleteFile(value: number) {
    setFiles((prev) => prev.filter((_, index) => index !== value))
    setStrings((prev) => prev.filter((_, index) => index !== value))
  }

  return (
    <fieldset className="w-full flex flex-col gap-1">
      <label className="text-text-primary text-sm font-normal text-left">Фото и видео</label>
      <div data-photos className="pt-3 w-full grid grid-cols-3 max-md:grid-cols-2 gap-4 z-10">
        {photos.map((item) => (
          <div
            data-photo
            className="!border-none !outline-none"
            key={`${item.id}-photo-state`}
            data-delete={deleteIdPhotos.includes(item.id!)}
          >
            <NextImageMotion
              src={item.attributes.url}
              alt="offer-image"
              width={400}
              height={400}
              data-image
              hash={item?.attributes?.blur}
            />
            <div
              className="absolute top-1.5 right-1.5 h-8 w-8 rounded-full bg-BG-second shadow-menu-absolute flex items-center justify-center *:w-4 *:h-4 text-text-primary cursor-pointer"
              onClick={() => {
                setDeleteIdPhotos((prev) => {
                  if (prev.includes(item.id)) {
                    return prev.filter((_) => _ !== item.id)
                  } else {
                    return [...prev, item.id]
                  }
                })
              }}
            >
              <IconSprite id="trash-20-20" />
            </div>
          </div>
        ))}
        {strings.map((item, index) => (
          <UploadPhoto
            key={`${item}-photo-${index}`}
            index={index}
            selected={item}
            files={files[index]}
            setFiles={(value) => setFiles((prev) => [...prev, value])}
            setSelectedImage={(value) => setStrings((prev) => [...prev, value])}
            deleteFile={deleteFile}
          />
        ))}
        {files.length <= 9 ? (
          <UploadPhoto
            key={`upload-000`}
            index={strings.length}
            selected={""}
            files={files[files.length]}
            setFiles={(value) => setFiles((prev) => [...prev, value])}
            setSelectedImage={(value) => setStrings((prev) => [...prev, value])}
            deleteFile={deleteFile}
          />
        ) : null}
      </div>
    </fieldset>
  )
}

ControlImages.displayName = "ControlImages"
export default ControlImages
