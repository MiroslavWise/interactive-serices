import { flushSync } from "react-dom"
import { ChangeEvent, memo, useState } from "react"

import type { IMageProfile } from "../types/types"
import type { IPatchProfileData } from "@/services/profile/types"

import { ImageStatic, NextImageMotion } from "@/components/common"

import { patchProfile } from "@/services"

import styles from "../styles/image.module.scss"

export const ImageProfile = memo(function ImageProfile({ file, image, setFile, idProfile, refetch }: IMageProfile) {
  const [loading, setLoading] = useState(false)

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation()
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFile((prev) => ({
          ...prev,
          string: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
      setFile((prev) => ({ ...prev, file: file }))
    }
  }

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
        flushSync(() => {
          setLoading(false)
        })
      }

      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
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
          >
            <img src="/svg/x-close.svg" alt="x" width={16} height={16} />
          </button>
        ) : null}
      </div>
      <div data-upload>
        {!file.string && !image ? (
          <p>
            Загрузите фотографию, на которой будет различимо ваше лицо. Фотографии без лица, с приоритетом на иные части тела, а также
            нерелевантные фотографии будут удалены
          </p>
        ) : (
          <span></span>
        )}
        <a>
          <input type="file" onChange={handleImageChange} accept=".jpg, .jpeg, .png, image/*" />
          Изменить
        </a>
      </div>
    </div>
  )
})
