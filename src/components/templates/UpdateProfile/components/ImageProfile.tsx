import { useDropzone } from "react-dropzone"
import { memo, useCallback, useState } from "react"

import type { IMageProfile } from "../types/types"
import type { IPatchProfileData } from "@/services/profile/types"

import { ImageStatic, NextImageMotion } from "@/components/common"

import { patchProfile } from "@/services"

import styles from "../styles/image.module.scss"

export const ImageProfile = memo(function ImageProfile({
  file,
  image,
  setFile,
  idProfile,
  refetch,
  errorFile,
  setErrorFile,
}: IMageProfile) {
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("acceptedFiles: ", acceptedFiles)
    const file = acceptedFiles[0]

    if (file) {
      if (file.size < 9.9 * 1024 * 1024) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFile((prev) => ({
            ...prev,
            string: reader.result as string,
          }))
        }
        reader.readAsDataURL(file)
        setFile((prev) => ({ ...prev, file: file }))
        setErrorFile(null)
      } else {
        setErrorFile("Максимальный размер фото - 10 МБ. Пожалуйста, выберите фото меньшего размера для загрузки.")
      }
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 9.9 * 1024 * 1024,
  })

  async function handleDelete() {
    if (!loading) {
      if (!!image) {
        const dataPatch: IPatchProfileData = {
          imageId: null,
        }
        await patchProfile(dataPatch, idProfile).then(() => {
          refetch().then(() => {
            setLoading(false)
          })
        })
      }
      if (!!file.string) {
        setFile({
          file: null,
          string: "",
        })
        requestAnimationFrame(() => {
          setLoading(false)
        })
      }

      setLoading(false)
    }
  }

  return (
    <div className={styles.container} data-test="container-update-image-profile">
      <div data-img={!!file.string || !!image}>
        {file.string ? (
          <ImageStatic src={file.string} alt="avatar" width={80} height={80} />
        ) : image ? (
          <NextImageMotion src={image} alt="avatar" width={80} height={80} />
        ) : (
          <img src="/svg/profile-null.svg" alt="avatar" height={48} width={48} />
        )}
        {!!file.string || !!image ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              handleDelete()
            }}
            disabled={loading}
            data-test="button-update-image-profile-delete-photo"
          >
            <img src="/svg/x-close.svg" alt="x" width={16} height={16} />
          </button>
        ) : null}
      </div>
      <div data-upload {...getRootProps()}>
        {!file.string && !image ? (
          <p>
            Загрузите фотографию, на которой будет различимо ваше лицо. Фотографии без лица, с приоритетом на иные части тела, а также
            нерелевантные фотографии будут удалены
          </p>
        ) : errorFile ? (
          <i>{errorFile}</i>
        ) : null}
        <a>
          <input type="file" data-test="input-update-image-profile" {...getInputProps()} multiple={false} />
          Изменить
        </a>
      </div>
    </div>
  )
})
