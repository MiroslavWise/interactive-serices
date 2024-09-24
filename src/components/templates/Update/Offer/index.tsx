"use client"

import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { type IValues } from "./types"
import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { type IPatchOffers } from "@/services/offers/types"
import { type IFeatureMember, type IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import ControlHelp from "./ControlHelp"
import { UploadPhoto } from "@/components/common/custom"
import IconTrashBlack from "@/components/icons/IconTrashBlack"
import { Button, ImageCategory, NextImageMotion, WalletPay } from "@/components/common"

import { queryClient } from "@/context"
import { createAddress } from "@/helpers/address/create"
import { useDebounce, useOutsideClickEvent } from "@/helpers"
import { dispatchUpdateOffer, useAuth, useUpdateOffer } from "@/store"
import { fileUploadService, getGeocodeSearch, getUserIdOffers, patchOffer } from "@/services"

export default function UpdateOffer() {
  const { id: userId } = useAuth(({ user }) => user) ?? {}
  const [loading, setLoading] = useState(false)
  const [deleteIdPhotos, setDeleteIdPhotos] = useState<number[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [strings, setStrings] = useState<string[]>([])
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const debouncedValue = useDebounce(onChangeAddress, 1000)
  const offer = useUpdateOffer(({ offer }) => offer)
  const [focusGeo, setFocusGeo, refGeo] = useOutsideClickEvent()

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
    control,
  } = useForm<IValues>({
    defaultValues: {
      description: offer?.description! || "",
      address: geo?.id,
      help: !!offer?.urgent,
    },
  })

  async function onChangeAddress() {
    if (inputGeo?.trim()?.length > 2) {
      const slug = inputGeo?.replaceAll(" ", "-")?.toLowerCase()
      const response = await queryClient.fetchQuery({
        queryFn: () => getGeocodeSearch(inputGeo),
        queryKey: ["addresses", { string: slug }],
      })
      setValuesAddresses(response)
    }
  }

  const exactAddresses = useMemo(() => {
    if (!valuesAddresses) {
      return null
    }
    return valuesAddresses?.response?.GeoObjectCollection?.featureMember || null
  }, [valuesAddresses])

  const onSubmit = handleSubmit(async (values) => {
    if (!loading) {
      setLoading(true)
      const body: IPatchOffers = {}

      if (offer?.description !== values.description && !!values.description) {
        body.description = values.description
      }

      const oldHelp = !!offer?.urgent
      const newHelp = !!values?.help

      if (oldHelp !== newHelp) {
        if (newHelp) {
          body.urgent = EnumHelper.HELP_KURSK
        } else {
          body.urgent = ""
        }
      }

      if (values.address !== offer?.addresses[0]?.id && values.address) {
        const { data } = await createAddress(values.address! as IFeatureMember, userId!)
        console.log("body responses: ", data)
        if (data?.id) {
          body.addresses = [data?.id!]
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

        if (responses?.some((item) => !!item.data)) {
          responses
            ?.map((item) => item?.data)
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
        }
        close()
        setLoading(false)
      })
    }
  })

  return (
    <>
      <header className="h-standard-header-modal flex items-center justify-center border-b border-solid border-grey-separator p-5 pb-4 md:pb-5 md:pt-6">
        <h3 className="text-text-primary text-center text-2xl font-semibold">Редактирование</h3>
      </header>
      <form
        onSubmit={onSubmit}
        className="w-full overflow-x-hidden overflow-y-auto h-full-minus-standard-header-modal flex flex-col gap-5 p-5 px-[4.375rem] md:pb-[1.625rem]"
      >
        <fieldset className="w-full flex flex-col gap-2">
          <label {...register("address", { required: true })} className="text-text-primary text-sm font-normal text-left">
            Ваш адрес
          </label>
          <div data-input ref={refGeo}>
            <input
              type="text"
              data-error={!!errors.address}
              value={inputGeo}
              onChange={(event) => {
                setInputGeo(event.target.value || "")
                debouncedValue()
              }}
              onFocus={(event) => {
                event.stopPropagation()
                setFocusGeo(true)
              }}
            />
            {focusGeo && exactAddresses ? (
              <div
                data-list
                className="absolute top-[calc(100%_+_0.25rem)] w-full z-50 overflow-hidden rounded-xl bg-BG-second overflow-y-auto"
              >
                <ul className="h-full flex flex-col p-3">
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
        <fieldset className="w-full flex flex-col gap-2">
          <label className="text-text-primary text-sm font-normal text-left">Предложить категорию</label>
          <div data-input className="relative w-full h-12">
            <input type="text" readOnly disabled />
            <div
              data-category
              className="absolute top-1/2 -translate-y-1/2 h-8 left-3.5 rounded-2xl flex flex-row items-center gap-1 p-1 pr-1.5 border border-solid border-grey-stroke-light bg-grey-field z-20"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-BG-icons p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4">
                <ImageCategory id={offer?.categoryId!} slug={offer?.category?.slug} provider={offer?.category?.provider} />
              </div>
              <span className="text-text-primary text-sm font-normal line-clamp-1 text-ellipsis">
                {offer?.category?.title || "Категория"}
              </span>
            </div>
          </div>
        </fieldset>
        <Controller
          name="description"
          control={control}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 512,
          }}
          render={({ field, fieldState: { error } }) => (
            <fieldset className="w-full flex flex-col gap-2">
              <label className="text-text-primary text-sm font-normal text-left">Описание предложения</label>
              <div data-text-area className="rounded-2xl">
                <textarea
                  {...field}
                  data-error={!!error}
                  maxLength={512}
                  className="p-3.5 pb-6"
                  onChange={(event) => field.onChange(event.target.value)}
                />
                <span>{field.value.length || 0}/512</span>
              </div>
              {!!error ? (
                error.type === "required" ? (
                  <i>Обязательное поле</i>
                ) : error.type === "minLength" ? (
                  <i>Не менее 3-х символов в описании</i>
                ) : error.type === "maxLength" ? (
                  <i>Не более 512 символов</i>
                ) : null
              ) : null}
            </fieldset>
          )}
        />
        <ControlHelp control={control} />
        <fieldset className="w-full flex flex-col gap-1">
          <label className="text-text-primary text-sm font-normal text-left">Фото и видео</label>
          <p className="text-text-disabled text-sm font-normal text-left">
            Добавьте фотографии и видео, это помогает выделить предложение среди других
          </p>
          <div data-photos className="pt-3 w-full grid grid-cols-3 max-md:grid-cols-2 gap-4 z-10">
            {photos.map((item) => (
              <div
                data-photo
                className="!border-none !outline-none"
                key={`${item.id}-photo-state`}
                data-delete={deleteIdPhotos.includes(item.id!)}
              >
                <NextImageMotion src={item.attributes.url} alt="offer-image" width={400} height={400} data-image />
                <div
                  className="absolute top-1.5 right-1.5 h-8 w-8 rounded-full bg-BG-second shadow-menu-absolute flex items-center justify-center *:w-4 *:h-4 [&>svg>path]:fill-text-primary cursor-pointer"
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
                  <IconTrashBlack />
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
        {!watch("help") && <WalletPay />}
        <Button
          type="submit"
          typeButton="fill-primary"
          label="Сохранить"
          loading={loading}
          disabled={!watch("description").trim().length}
        />
      </form>
    </>
  )
}
