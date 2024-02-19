"use client"

import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import type { IValuesForm } from "./types/types"
import type { IPatchOffers } from "@/services/offers/types"

import { UploadPhoto } from "@/components/common/custom"
import { Button, ButtonClose, NextImageMotion } from "@/components/common"
import { TextArea } from "@/components/common/Inputs/components/TextArea"

import { cx } from "@/lib/cx"
import { getUserIdOffers, patchOffer, fileUploadService } from "@/services"
import { useAuth, useOffersCategories, useUpdateMutualOffer } from "@/store"

import styles from "./styles/style.module.scss"
import { EnumTypeProvider } from "@/types/enum"

export const UpdateMutualOffer = () => {
  const userId = useAuth(({ userId }) => userId)
  const data = useUpdateMutualOffer(({ data }) => data)
  const visibleUpdateMutual = useUpdateMutualOffer(({ visibleUpdateMutual }) => visibleUpdateMutual)
  const dispatchUpdateMutual = useUpdateMutualOffer(({ dispatchUpdateMutual }) => dispatchUpdateMutual)
  const [deleteIdPhotos, setDeleteIdPhotos] = useState<number[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [strings, setStrings] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IValuesForm>({
    defaultValues: {
      description: data?.title!,
    },
  })

  const { refetch } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: data?.provider!, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: data?.provider }],
    enabled: false,
  })

  const provider = data?.provider!

  const photos = data?.images || []
  const geo = data?.addresses?.[0] || null

  function cancel() {
    dispatchUpdateMutual({ visible: false })
  }

  function submit(values: IValuesForm) {
    if (!loading) {
      setLoading(true)
      const dataSheets: IPatchOffers = {}
      if (data?.title !== values.description && values.description.trim()) {
        dataSheets.title = values.description!
      }
      const photoIds = data?.images?.filter((item) => !deleteIdPhotos.includes(item.id!)).map((item) => item.id) || []

      const lengthDataImages = photoIds.length
      const lengthMinus = 9 - lengthDataImages < 0 ? 0 : 9 - lengthDataImages

      if (!Object.keys(dataSheets).length && photoIds.length === data?.images?.length && !files.length) {
        setLoading(false)
        cancel()
        return
      }

      dataSheets.images = photoIds || []

      Promise.all(
        files.length
          ? files.slice(0, lengthMinus).map((item) =>
              fileUploadService(item!, {
                type: data?.provider!,
                userId: userId!,
                idSupplements: data?.id!,
              }),
            )
          : [],
      ).then((responses) => {
        if (responses.length) {
          responses.forEach((item) => {
            if (item.res?.id) {
              dataSheets.images?.push(item?.res?.id!)
            }
          })
        }
        patchOffer(dataSheets, data?.id!).then((response) => {
          refetch().finally(() => {
            setLoading(false)
            cancel()
          })
        })
      })
    }
  }

  const onSubmit = handleSubmit(submit)

  function deleteFile(value: number) {
    setFiles((prev) => prev.filter((_, index) => index !== value))
    setStrings((prev) => prev.filter((_, index) => index !== value))
  }

  const headerTitle =
    provider === EnumTypeProvider.alert
      ? "Обновить SOS"
      : provider === EnumTypeProvider.offer
      ? "Обновить предложение"
      : provider === EnumTypeProvider.discussion
      ? "Обновить обсуждение"
      : null

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={visibleUpdateMutual}>
      <section>
        <ButtonClose onClick={cancel} position={{}} />
        <div data-header>
          <h3>{headerTitle}</h3>
        </div>
        <form onSubmit={onSubmit}>
          {geo ? (
            <div data-div>
              <label>Адрес</label>
              <span>{geo?.additional}</span>
            </div>
          ) : null}
          <div data-div>
            <label>Изменить текст, чтобы люди могли понять что вы хотите</label>
            <div data-text-area>
              <textarea
                placeholder="Напишите что-нибудь"
                {...register("description", { required: true })}
                data-error={!!errors?.description?.message}
                maxLength={400}
              />
              <sup>{watch("description")?.length || 0}/400</sup>
            </div>
          </div>
          <div data-div>
            <label>Добавить или удалить фото (не более 9 фото)</label>
            <div data-photos>
              {photos.map((item) => (
                <div data-photo key={`${item.id}-photo-state`} data-delete={deleteIdPhotos.includes(item.id!)}>
                  <NextImageMotion src={item.attributes.url} alt="offer-image" width={400} height={400} data-image />
                  <div
                    data-trash
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
                    <Image src="/svg/trash-black.svg" alt="trash" width={16} height={16} unoptimized />
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
          </div>
          <footer>
            <Button label="Отмена" typeButton="regular-primary" type="button" onClick={cancel} loading={loading} />
            <Button label="Обновить" typeButton="fill-primary" type="submit" loading={loading} />
          </footer>
        </form>
      </section>
    </div>
  )
}
