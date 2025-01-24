"use client"

import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"
import { type IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import Button from "@/components/common/Button"
import ControlHelp from "./components/ControlHelp"
import { UploadPhoto } from "@/components/common/custom"
import IconTrashBlack from "@/components/icons/IconTrashBlack"
import { ImageCategory, NextImageMotion } from "@/components/common"

import { queryClient } from "@/context"
import { updateOffer } from "./utils/update"
import { useDebounce, useOutsideClickEvent } from "@/helpers"
import { getGeocodeSearch, getUserIdOffers } from "@/services"
import { dispatchUpdateOffer, useAuth, useUpdateOffer } from "@/store"
import { resolverUpdateOffer, TSchemaUpdateOffer } from "./utils/types"
import { LIMIT_DESCRIPTION } from "../DiscussionAndAlert/shema"

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
  } = useForm<TSchemaUpdateOffer>({
    defaultValues: {
      title: offer?.title ?? "",
      description: offer?.description! ?? "",
      address: geo?.id,
      help: !!offer?.urgent,
    },
    resolver: resolverUpdateOffer,
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
      updateOffer({ values, defaults: offer!, files, images: photos, deleteIdPhotos, userId: userId! }).then((res) => {
        if (typeof res.ok !== "string" && res.ok) {
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
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <fieldset className="relative w-full flex flex-col gap-2">
              <label className="text-text-primary text-sm font-normal text-left" htmlFor={field.name}>
                Название
              </label>
              <input type="text" {...field} />
              {!!error ? <i>{error.message}</i> : null}
            </fieldset>
          )}
        />
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
          render={({ field, fieldState: { error } }) => (
            <fieldset className="w-full flex flex-col gap-2">
              <label className="text-text-primary text-sm font-normal text-left">Описание услуги или умения</label>
              <div data-text-area className="rounded-2xl">
                <textarea
                  {...field}
                  data-error={!!error}
                  maxLength={LIMIT_DESCRIPTION}
                  className="p-3.5 pb-6"
                  onChange={(event) => field.onChange(event.target.value)}
                />
                <span>
                  {field.value.length || 0}/{LIMIT_DESCRIPTION}
                </span>
              </div>
              {!!error ? <i>{error.message}</i> : null}
            </fieldset>
          )}
        />
        <ControlHelp control={control} />
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
        <fieldset
          className="relative w-full flex flex-col gap-2"
          style={{
            zIndex: focusGeo ? 100 : 3,
          }}
        >
          <label {...register("address", { required: true })} className="text-text-primary text-sm font-normal text-left">
          Адрес
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
                className="absolute bottom-[calc(100%_+_0.25rem)] w-full z-50 overflow-hidden rounded-xl bg-BG-second overflow-y-auto"
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
