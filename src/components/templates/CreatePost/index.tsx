"use client"

import { useMemo, useState } from "react"
import { type AxiosProgressEvent } from "axios"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { EnumTypeProvider } from "@/types/enum"
import { type IBodyNote } from "@/services/notes/types"
import { type IBodyPost } from "@/services/posts/types"
import { type IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import { Button } from "@/components/common"
import IconXClose from "@/components/icons/IconXClose"
import CurrentImage from "../CreateNewOptionModal/components/CurrentImage"

import { cx } from "@/lib/cx"
import { clg } from "@console"
import { queryClient } from "@/context"
import { getPosts, postPosts } from "@/services/posts"
import { patchNote, postNote } from "@/services/notes"
import { createAddress } from "@/helpers/address/create"
import { dispatchModal, EModalData, useAuth } from "@/store"
import { fileUploadService, getGeocodeSearch } from "@/services"
import { handleImageChange, onProgress, onUploadProgress } from "./utils"
import { LIMIT_DESCRIPTION, resolverCreate, type TSchemaCreatePost } from "./schema"
import { transliterateAndReplace, useDebounce, useOutsideClickEvent } from "@/helpers"

function CreatePost() {
  const [isFocus, setIsFocus, ref] = useOutsideClickEvent()
  const debouncedValue = useDebounce(onChangeAddress, 200)
  const [loading, setLoading] = useState(false)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [progress, setProgress] = useState<Record<string, AxiosProgressEvent>>({})

  const { refetch: refetchProfile } = useQuery({
    queryFn: () => getPosts({ order: "DESC", user: userId! }),
    queryKey: ["posts", { userId: userId!, order: "DESC" }],
    enabled: !!userId,
  })

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<TSchemaCreatePost>({
    resolver: resolverCreate,
    defaultValues: {
      title: "",
      description: "",
      file: {
        file: [],
        string: [],
      },
      address: "",
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const title = values.title.trim().slice(0, 254)
    const slug = transliterateAndReplace(title)

    const data: IBodyPost = {
      title,
      slug,
      addresses: [],
    }

    if (!loading) {
      setLoading(true)
      const responseAddress = await createAddress(values.addressFeature!, userId!)
      const { id: addressId } = responseAddress.data ?? {}
      if (addressId) {
        data.addresses = [addressId]
      }
      const response = await postPosts(data)
      clg("response post posts:", response.data)
      if (!!response.data) {
        const id = response.data!.id!
        const dataNote: IBodyNote = {
          main: true,
          postId: id,
        }
        const description = values.description.trim()
        if (!!description) {
          dataNote.description = description
        }
        const responseNote = await postNote(dataNote)
        refetchProfile()
        const idNote = responseNote?.data!?.id
        const files = values.file.file
        if (!!idNote && !!files.length) {
          const responseIds = await Promise.all(
            files.map((item) =>
              fileUploadService(item!, {
                type: EnumTypeProvider.NOTE,
                userId: userId!,
                idSupplements: idNote,
                onUploadProgress: (value, name) => onUploadProgress(value, name, setProgress),
              }),
            ),
          )
          const ids = responseIds.filter((item) => !!item.data?.id).map((item) => item.data?.id!)
          if (ids.length) {
            const data: Partial<IBodyNote> = {
              images: ids,
            }
            await patchNote(idNote, data)
          }
        }
        setLoading(false)
        dispatchModal(EModalData.SUCCESS_CREATE_POST)
      } else {
        setLoading(false)
      }
    }
  })

  async function onChangeAddress() {
    if (watch("address")?.length > 2 && isFocus) {
      const slug = watch("address")?.replaceAll(" ", "-")
      const response = await queryClient.fetchQuery({
        queryFn: () => getGeocodeSearch(watch("address")),
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

    const addresses = valuesAddresses?.response?.GeoObjectCollection?.featureMember?.filter((item) =>
      ["RU", "BY"].includes(item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.country_code!),
    )

    return Array.isArray(addresses) && addresses?.length > 0 ? addresses : null
  }, [valuesAddresses])
  const isEmptySearch = !loadingAddresses && Array.isArray(valuesAddresses?.response?.GeoObjectCollection?.featureMember)
  const focusAddress = () => setIsFocus(true)
  const blurAddress = () => setIsFocus(false)

  const disabled = !watch("title").trim() || !watch("address") || !(!!watch("description").trim() || !!watch("file").file.length)

  return (
    <>
      <header className="w-full px-3 pt-5 md:pt-6 pb-4 md:pb-5 overflow-hidden flex flex-row items-center justify-start md:justify-center border-b border-solid border-grey-separator h-[var(--height-standard-header-modal)]">
        <h3 className="text-text-primary text-2xl font-semibold">Новый пост</h3>
      </header>
      <ul
        data-test="ul-create-new-post"
        className="w-full flex flex-col items-center gap-4 px-5 h-[calc(100%_-_var(--height-standard-header-modal))]"
      >
        <form onSubmit={onSubmit} className="w-full h-full overflow-y-auto flex flex-col items-center gap-4 md:gap-5">
          <p className="text-text-primary text-sm text-left font-normal">
            Пост это ваша персональная новостная лента. Формат подходит для мероприятий, регулярных активностей, турниров. В пост можно
            добавлять новые записи: тексты и фото. Другие пользователи смогут комментировать ваш пост.
          </p>
          <Controller
            control={control}
            name="address"
            render={({ field, fieldState: { error } }) => (
              <fieldset ref={ref}>
                <label htmlFor={field.name} title="Адрес">
                  Адрес
                </label>
                <div data-input-selector>
                  <input
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.value)
                      debouncedValue()
                      setLoadingAddresses(true)
                    }}
                    className="font-normal"
                    value={field.value}
                    type="text"
                    data-error={!!error}
                    onFocus={focusAddress}
                    placeholder="Введите адрес"
                    autoComplete="off"
                  />
                  <button
                    data-select-icon={isFocus}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      field.onChange("")
                      blurAddress()
                    }}
                  >
                    <IconXClose />
                  </button>
                  <ul data-active={isFocus && (isEmptySearch || Array.isArray(exactAddresses))} data-is-empty-search={isEmptySearch}>
                    {Array.isArray(exactAddresses) ? (
                      exactAddresses.map((item, index) => (
                        <li
                          key={`${item.GeoObject.uri}-${index}`}
                          onClick={(event) => {
                            event.stopPropagation()
                            field.onChange(item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text!)
                            setValue("addressFeature", item)
                            blurAddress()
                            trigger("address")
                            trigger("addressFeature")
                          }}
                        >
                          <span>{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
                        </li>
                      ))
                    ) : isEmptySearch ? (
                      <p>По вашему запросу нет подходящих адресов</p>
                    ) : null}
                  </ul>
                </div>
                {!!error || !!errors.addressFeature ? <i>Выберите существующий адрес</i> : null}
              </fieldset>
            )}
          />
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset data-test="fieldset-create-new-option-title">
                <label htmlFor={field.name}>Тема поста</label>
                <input
                  {...field}
                  onChange={(event) => field.onChange(event.target.value.replace(/\s{2,}/g, " "))}
                  type="text"
                  placeholder="Например, спортивный турнир или рок-фестиваль"
                  data-error={!!error}
                  className="font-normal"
                />
                {!!error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset data-test="fieldset-create-new-option-description">
                <label htmlFor={field.name}>Первая запись</label>
                <div className="w-full relative h-[7.375rem]">
                  <textarea
                    {...field}
                    placeholder="Создайте первую запись в серии — это может быть приглашение к участию, анонс или рассказ про процесс подготовки"
                    data-error={!!error}
                    maxLength={LIMIT_DESCRIPTION + 2}
                    className={cx(
                      "whitespace-pre-wrap w-full font-normal outline-none h-full border border-solid resize-none focus:!border-text-accent px-3.5 pt-3.5 pb-6 text-text-primary placeholder:text-text-disabled text-sm rounded-2xl",
                      !!error ? "!border-text-error" : "!border-grey-stroke",
                    )}
                  />
                  <span
                    data-error={field.value?.length + 20 >= LIMIT_DESCRIPTION}
                    className={cx(
                      "absolute bottom-1 right-3.5 text-right text-xs font-normal",
                      !!error ? "text-text-error" : "text-text-primary",
                    )}
                  >
                    {field.value?.length || 0}/{LIMIT_DESCRIPTION}
                  </span>
                </div>
                {!!error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <fieldset className="!gap-4">
                <label htmlFor={field.name}>Фото</label>
                <p className="-mt-3 text-text-disabled text-sm font-normal">Добавьте к посту фото, постер или афишу</p>
                <div className="w-full grid justify-center gap-4 grid-cols-3 max-md:grid-cols-2">
                  {field.value.string.map((item, index) => (
                    <CurrentImage
                      key={`${index}-image`}
                      item={item}
                      index={index}
                      //@ts-ignore
                      field={field}
                      progress={!loading ? null : onProgress(field.value.file, index, progress)}
                    />
                  ))}
                  {field.value.string.length < 9 ? (
                    <div data-image="new">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (event) => {
                          const dataValues = await handleImageChange(field.value, event)
                          field.onChange(dataValues)
                          event.target.value = ""
                        }}
                        multiple
                      />
                    </div>
                  ) : null}
                </div>
                <i className="!text-text-disabled !-mt-3">Максимальный размер фото - 10 МБ</i>
                <i className="!text-text-disabled !-mt-3">Не более 9 изображений</i>
              </fieldset>
            )}
          />
          <footer className="w-full pt-2.5 mt-auto bg-BG-second">
            <Button
              type="submit"
              typeButton="fill-primary"
              label="Создать пост"
              className="w-full h-11 py-2.5"
              loading={loading}
              disabled={loading || disabled}
            />
          </footer>
        </form>
      </ul>
    </>
  )
}

CreatePost.displayName = "CreatePost"
export default CreatePost
