"use client"

import Image from "next/image"
import { type Dispatch, type ChangeEvent } from "react"

import { ImageStatic } from "@/components/common"

interface IUploadPhoto {
  files: File
  index: number
  selected: string

  setFiles: Dispatch<File>
  setSelectedImage: Dispatch<string>
  deleteFile: Dispatch<number>
}

export const UploadPhoto = ({ index, selected, setFiles, setSelectedImage, deleteFile }: IUploadPhoto) => {
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files

    if (file && file?.length > 0) {
      for (let i = 0; i < file.length; i++) {
        if (file[i]) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setSelectedImage(reader.result as string)
          }
          reader.readAsDataURL(file[i])
          setFiles(file[i])
        }
      }
    }
  }

  function deletePhoto(index: number) {
    deleteFile(index)
  }

  return (
    <div
      className="relative flex items-center justify-center w-full md:max-w-[9.5rem] overflow-hidden rounded-2xl border-2 border-dashed border-grey-field bg-BG-first cursor-pointer z-20 max-md:h-auto max-md:aspect-[152/196]"
      data-upload
    >
      {selected ? (
        <ImageStatic
          src={selected}
          height={900}
          width={300}
          alt="offer"
          className="absolute inset-0 z-30 h-full w-full"
          onClick={() => deletePhoto(index)}
        />
      ) : (
        <Image src="/svg/plus-gray.svg" alt="plus-gray" height={60} width={60} unoptimized />
      )}
      <input
        type="file"
        accept="video/*, image/*"
        onChange={handleImageChange}
        multiple
        className="absolute inset-0 cursor-pointer opacity-0 z-20"
      />
    </div>
  )
}
