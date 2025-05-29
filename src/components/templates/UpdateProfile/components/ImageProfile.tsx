import { useDropzone } from "react-dropzone"
import { memo, useCallback, useState } from "react"

import { type IMageProfile } from "../types/types"
import { type IPatchProfileData } from "@/services/profile/types"

import { IconSprite } from "@/components/icons/icon-sprite"
import { ImageStatic, NextImageMotion } from "@/components/common"

import { cx } from "@/lib/cx"
import { patchProfile } from "@/services"

import styles from "../styles/image.module.scss"

export const ImageProfile = memo(function ImageProfile({ file, image, setFile, refetch, errorFile, setErrorFile }: IMageProfile) {
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
  })

  async function handleDelete() {
    if (!loading) {
      if (!!image) {
        const dataPatch: IPatchProfileData = {
          imageId: null,
        }
        await patchProfile(dataPatch).then(() => {
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
        setLoading(false)
      }

      setLoading(false)
    }
  }

  return (
    <div className={cx(styles.container, "w-full flex flex-row items-end justify-start gap-3")} data-test="container-update-image-profile">
      <div
        data-img={!!file.string || !!image}
        className={cx(
          "relative rounded-2xl bg-grey-stroke-light group w-20 h-20 p-10",
          !!file.string || !!image ? "" : "flex rounded-.625",
        )}
      >
        {!!file.string ? (
          <ImageStatic
            src={file.string}
            alt="avatar"
            width={160}
            height={160}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto aspect-square rounded-2xl"
          />
        ) : !!image ? (
          <NextImageMotion
            src={image}
            alt="avatar"
            width={160}
            height={160}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto aspect-square rounded-2xl"
          />
        ) : (
          <img
            src="/svg/profile-null.svg"
            alt="avatar"
            height={160}
            width={160}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
          />
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
            className="w-6 h-6 flex items-center justify-center border border-solid border-grey-stroke-light rounded-xl bg-BG-second absolute -top-1.5 -right-1.5 md:opacity-0 md:invisible group-hover:opacity-100 group-hover:visible *:w-4 *:h-4 [&>svg>path]:stroke-text-primary"
          >
            <IconSprite id="x-close-20-20" />
          </button>
        ) : null}
      </div>
      <div data-upload {...getRootProps()} className="flex flex-col justify-end gap-3">
        {errorFile ? (
          <span className="text-text-error text-xs font-normal">{errorFile}</span>
        ) : !file.string && !image ? (
          <p className="text-text-secondary text-[0.8125rem] leading-4 font-normal">
            Загрузите фотографию, на которой будет различимо ваше лицо. Фотографии без лица, с приоритетом на иные части тела, а также
            нерелевантные фотографии будут удалены
          </p>
        ) : null}
        <a className="relative text-text-accent text-sm font-normal cursor-pointer">
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            data-test="input-update-image-profile"
            {...getInputProps()}
            multiple={false}
          />
          {!file.string && !image ? "Загрузить" : "Изменить"}
        </a>
      </div>
    </div>
  )
})
