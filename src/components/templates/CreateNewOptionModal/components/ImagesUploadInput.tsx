"use client"

import { useId } from "react"

import type { TImagesUploadInput } from "./types/types"

import { UploadPhoto } from "@/components/common/custom"

import styles from "./styles/images-upload.module.scss"

export const ImagesUploadInput: TImagesUploadInput = ({ files, setFile, selected, setSelectedFile }) => {
  const id = useId()

  function deleteFile() {}

  return (
    <div className={styles.container}>
      <ul>
        {files.map((item, index) => (
          <UploadPhoto
            key={`${id}_photo_alert_${index}`}
            files={item}
            index={index}
            selected={selected[index]}
            setFiles={setFile}
            setSelectedImage={setSelectedFile}
            deleteFile={deleteFile}
          />
        ))}
        {files.length < 6 ? (
          <UploadPhoto
            key={`${files.length}_file`}
            files={files[files.length]}
            index={files.length}
            selected={selected[files.length]}
            setFiles={setFile}
            setSelectedImage={setSelectedFile}
            deleteFile={deleteFile}
          />
        ) : null}
      </ul>
    </div>
  )
}
