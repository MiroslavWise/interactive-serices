"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import type { IValues } from "./types"
import { EnumTypeProvider } from "@/types/enum"
import type { IPatchOffers } from "@/services/offers/types"
import type { IFeatureMember, IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import { UploadPhoto } from "@/components/common/custom"
import { Button, ImageCategory, NextImageMotion } from "@/components/common"

import { queryClient } from "@/context"
import { createAddress } from "@/helpers/address/create"
import { useDebounce, useOutsideClickEvent } from "@/helpers"
import { fileUploadService, getGeocodeSearch, getUserIdOffers, patchOffer } from "@/services"
import { dispatchUpdateOffer, useAuth, useOffersCategories, useUpdateOffer } from "@/store"

export default function UpdateOffer() {
  const userId = useAuth(({ userId }) => userId)
  const [loading, setLoading] = useState(false)
  const [deleteIdPhotos, setDeleteIdPhotos] = useState<number[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [strings, setStrings] = useState<string[]>([])
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const debouncedValue = useDebounce(onChangeAddress, 200)
  const offer = useUpdateOffer(({ offer }) => offer)
  const categories = useOffersCategories(({ categories }) => categories)
  const [inputCategory, setInputCategory] = useState("")
  const [focusGeo, setFocusGeo, refGeo] = useOutsideClickEvent()
  const [focus, setFocus, ref] = useOutsideClickEvent()

  const { refetch } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: EnumTypeProvider.offer, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: EnumTypeProvider.offer }],
    enabled: false,
  })

  const photos = offer?.images || []
  const geo = offer?.addresses?.[0] || null

  function close() {
    dispatchUpdateOffer(false, undefined)
  }

  const [inputGeo, setInputGeo] = useState<string>(geo?.additional || "")

  function deleteFile(value: number) {
    setFiles((prev) => prev.filter((_, index) => index !== value))
    setStrings((prev) => prev.filter((_, index) => index !== value))
  }

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IValues>({
    defaultValues: {
      description: offer?.title!,
      category: offer?.categoryId!,
      address: geo?.id,
    },
  })

  const category = useMemo(() => {
    if (!categories?.length || !watch("category")) {
      return null
    }
    return categories?.find((item) => item.id === watch("category"))
  }, [categories, watch("category")])

  function deleteCategory() {
    setValue("category", null)
  }

  const listCategories = useMemo(() => {
    return (
      categories
        ?.filter((item) => item?.title?.toLowerCase()!?.includes(inputCategory?.toLowerCase()))
        ?.map((item) => ({
          label: item.title,
          value: item.id,
        })) || []
    )
  }, [categories, inputCategory])

  async function onChangeAddress() {
    if (inputGeo?.trim()?.length > 2) {
      const slug = inputGeo?.replaceAll(" ", "-")
      const response = await queryClient.fetchQuery({
        queryFn: () => getGeocodeSearch(inputGeo),
        queryKey: ["addresses", { string: slug }],
      })
      setValuesAddresses(response)
      setLoadingAddresses(false)
    }
  }

  const exactAddresses = useMemo(() => {
    if (!valuesAddresses) {
      return null
    }
    return (
      valuesAddresses?.response?.GeoObjectCollection?.featureMember?.filter((item) =>
        item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.some((_) => _?.kind === "street"),
      ) || null
    )
  }, [valuesAddresses])

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)
      const body: IPatchOffers = {}

      if (offer?.title !== values.description && !!values.description) {
        body.title = values.description
      }

      if (offer?.categoryId !== values.category && !!values.category) {
        body.categoryId = values.category! as number
      }

      if (values.address !== offer?.addresses[0]?.id && values.address) {
        const { res } = await createAddress(values.address! as IFeatureMember)
        console.log("body responses: ", res)
        if (res?.id) {
          body.addresses = [res?.id!]
        }
      }

      const photos = [...offer?.images.map((item) => item.id)!?.filter((item) => !deleteIdPhotos?.includes(item))]

      if (files.length) {
        const responses = await Promise.all([
          ...files.map((item) =>
            fileUploadService(item!, {
              type: EnumTypeProvider.offer,
              userId: userId!,
              idSupplements: offer?.id!,
            }),
          ),
        ])

        if (responses?.some((item) => item.ok)) {
          responses
            ?.map((item) => item?.res)
            ?.forEach((item) => {
              if (!!item?.id) {
                photos.push(item?.id!)
              }
            })
        }
      }

      if (JSON.stringify(photos.sort()) !== JSON.stringify(offer?.images.map((item) => item.id)?.sort())) {
        body.images = [...photos]
      }

      if (Object.entries(body).length === 0) {
        close()
        setLoading(false)
        return
      }

      patchOffer(body, offer?.id!).then((response) => {
        if (response.ok) {
          refetch()
          requestAnimationFrame(() => {
            close()
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      })
    }
  })

  return (
    <>
      <header>
        <h3>Обновить предложение</h3>
      </header>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label {...register("address", { required: true })}>Изменить адрес</label>
          <div data-input ref={refGeo}>
            <input
              type="text"
              data-error={!!errors.address}
              value={inputGeo}
              onChange={(event) => {
                setInputGeo(event.target.value || "")
                debouncedValue()
                setLoadingAddresses(true)
              }}
              onFocus={(event) => {
                event.stopPropagation()
                setFocusGeo(true)
              }}
            />
            {focusGeo && exactAddresses ? (
              <div data-list>
                <ul>
                  {exactAddresses.map((item) => (
                    <li
                      key={`::key::${item.GeoObject.uri}::category::`}
                      onClick={(event) => {
                        event.stopPropagation()
                        setValue("address", item!)
                        setInputGeo(item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text!)
                        setFocusGeo(false)
                      }}
                    >
                      <span>{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </fieldset>
        <fieldset>
          <label>Изменить предложение</label>
          <div data-input {...register("category", { required: true })} ref={ref}>
            <input
              type="text"
              value={inputCategory}
              onChange={(event) => setInputCategory(event.target.value || "")}
              data-error={!!errors.category}
              readOnly={!!category}
              disabled={!!category}
              onFocus={(event) => {
                event.stopPropagation()
                setFocus(true)
              }}
            />
            {category ? (
              <div data-category>
                <div data-icon>
                  <ImageCategory id={category.id!} />
                </div>
                <span>{category.title}</span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    deleteCategory()
                  }}
                >
                  <img src="/svg/x-close.svg" alt="x" width={16} height={16} />
                </button>
              </div>
            ) : null}
            {focus && !watch("category") ? (
              <div data-list>
                <ul>
                  {listCategories.map((item) => (
                    <li
                      key={`::key::${item.value}::category::`}
                      onClick={(event) => {
                        event.stopPropagation()
                        setValue("category", item.value)
                      }}
                    >
                      <div data-icon>
                        <ImageCategory id={item.value!} />
                      </div>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </fieldset>
        <fieldset>
          <label>Текущее описание</label>
          <div data-text-area>
            <textarea {...register("description", { required: true })} data-error={!!errors?.description} />
            <sup>{watch("description")?.length || 0}/400</sup>
          </div>
        </fieldset>
        <fieldset>
          <label>Загруженные фото</label>
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
                  <img src="/svg/trash-black.svg" alt="trash" width={16} height={16} />
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
        <Button type="submit" typeButton="fill-primary" label="Обновить" loading={loading} />
      </form>
    </>
  )
}
