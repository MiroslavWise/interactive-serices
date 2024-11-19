"use client"

import { useMemo, useState } from "react"
import { type AxiosProgressEvent } from "axios"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { type IBodyNote } from "@/services/notes/types"
import { type IBodyPost } from "@/services/posts/types"
import { EnumHelper, EnumTypeProvider } from "@/types/enum"
import { type IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import { Button } from "@/components/common"
import ControlHelp from "./components/ControlHelp"
import IconXClose from "@/components/icons/IconXClose"
import CurrentImage from "../CreateNewOptionModal/components/CurrentImage"

import { cx } from "@/lib/cx"
import { clg } from "@console"
import { queryClient } from "@/context"
import { getPosts, postPosts } from "@/services/posts"
import { patchNote, postNote } from "@/services/notes"
import { createAddress } from "@/helpers/address/create"
import { handleImageChange, onProgress, onUploadProgress } from "./utils"
import { fileUploadService, getGeocodeSearch, postAddress } from "@/services"
import { dispatchModal, EModalData, useAuth, useCreatePost, useModal } from "@/store"
import { transliterateAndReplace, useDebounce, useOutsideClickEvent } from "@/helpers"
import { resolverCreatePost, resolverCreatePostMap, type TSchemaCreatePost } from "./schema"
import { MAX_LENGTH_DESCRIPTION_NOTE } from "@/config/constants"
import IconFile_06 from "@/components/icons/IconFile_06"
import IconTrashBlack from "@/components/icons/IconTrashBlack"
import ControlParticipant from "./components/ControlParticipant"

function CreatePost() {
  const [isFocus, setIsFocus, ref] = useOutsideClickEvent()
  const debouncedValue = useDebounce(onChangeAddress, 200)
  const [loading, setLoading] = useState(false)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const [progress, setProgress] = useState<Record<string, AxiosProgressEvent>>({})
  const stateModal = useModal(({ data }) => data)
  const initMapAddress = useCreatePost(({ initAddress }) => initAddress)

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
    resolver: stateModal === EModalData.CREATE_POST_MAP ? resolverCreatePostMap : resolverCreatePost,
    defaultValues: {
      title: "",
      description: "",
      file: {
        file: [],
        string: [],
      },
      isParticipants: false,
      address: stateModal === EModalData.CREATE_POST_MAP ? initMapAddress?.additional : "",
      initAddress: stateModal === EModalData.CREATE_POST_MAP ? initMapAddress : undefined,
    },
  })

  clg("errors: ", errors, "error")

  const onSubmit = handleSubmit(async (values) => {
    const title = values.title.trim().slice(0, 254)
    const slug = transliterateAndReplace(title)
    const help = values.help

    const data: IBodyPost = {
      enabled: true,
      title,
      slug,
      addresses: [],
      // isAuthRead: false,
      isParticipants: values.isParticipants,
    }

    if (help) {
      data.urgent = true
    }

    if (!loading) {
      setLoading(true)
      const responseAddress = await (stateModal === EModalData.CREATE_POST_MAP && !!initMapAddress
        ? postAddress(initMapAddress)
        : createAddress(values.addressFeature!, userId!))
      const { id: addressId } = responseAddress.data ?? {}
      if (addressId) {
        data.addresses = [addressId]
      }
      const response = await postPosts(data)

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
        // window.open(`/success/post?id=${id}`)
      } else {
        setLoading(false)
      }
    }
  })

  async function onChangeAddress() {
    if (watch("address")?.length > 2 && isFocus) {
      const slug = watch("address")?.replaceAll(" ", "-")?.toLowerCase()
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

  const disabled = !watch("title").trim() || !watch("address") || !watch("description").trim()

  return (
    <>
      <header className="w-full px-3 pt-5 md:pt-6 pb-4 md:pb-5 overflow-hidden flex flex-row items-center justify-start md:justify-center border-b border-solid border-grey-separator h-standard-header-modal">
        <h3 className="text-text-primary text-2xl font-semibold">Новый пост</h3>
      </header>
      <ul data-test="ul-create-new-post" className="w-full flex flex-col items-center gap-4 px-5 h-full-minus-standard-header-modal">
        <form
          onSubmit={onSubmit}
          data-enum-form="from-create-new-post"
          className="w-full h-full overflow-y-auto flex flex-col items-center gap-4 md:gap-5 overflow-x-hidden"
        >
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
                    disabled={stateModal === EModalData.CREATE_POST_MAP && !!initMapAddress}
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
                  placeholder="Например, мастер-класс или фото природы"
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
                    maxLength={MAX_LENGTH_DESCRIPTION_NOTE + 2}
                    className={cx(
                      "whitespace-pre-wrap w-full font-normal outline-none h-full border border-solid resize-none focus:!border-text-accent px-3.5 pt-3.5 pb-6 text-text-primary placeholder:text-text-disabled text-sm rounded-2xl",
                      !!error ? "!border-text-error" : "!border-grey-stroke",
                    )}
                  />
                  <span
                    data-error={field.value?.length + 20 >= MAX_LENGTH_DESCRIPTION_NOTE}
                    className={cx(
                      "absolute bottom-1 right-3.5 text-right text-xs font-normal",
                      !!error ? "text-text-error" : "text-text-primary",
                    )}
                  >
                    {field.value?.length || 0}/{MAX_LENGTH_DESCRIPTION_NOTE}
                  </span>
                </div>
                {!!error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
          <ControlHelp control={control} />
          <Controller
            name="file"
            control={control}
            render={({ field }) => {
              const _strings = {
                images: [] as {
                  img: string
                  index: number
                }[],
                other: [] as {
                  name: string
                  str: string
                  index: number
                }[],
              }

              for (let i = 0; i < field.value.file.length; i++) {
                if (field.value.file[i].type.includes("image")) {
                  _strings.images.push({
                    img: field.value.string[i],
                    index: i,
                  })
                } else {
                  _strings.other.push({
                    name: field.value.file[i].name,
                    str: field.value.string[i],
                    index: i,
                  })
                }
              }

              return (
                <fieldset className="!gap-4">
                  <label htmlFor={field.name}>Фото или видео</label>
                  <p className="-mt-3 text-text-disabled text-sm font-normal">Добавьте к посту фото, видео или постер</p>
                  <div className={cx("w-full flex flex-col gap-2", _strings.other.length > 0 ? "flex" : "hidden")}>
                    {_strings.other.map((item) => (
                      <article
                        key={`:k:e:rT:${item.index}:`}
                        className="w-fit grid grid-cols-[1.5rem_minmax(0,1fr)_1.5rem] gap-1 items-center bg-btn-second-default p-1.5 pr-2 rounded-[1.125rem]"
                      >
                        <div className="w-6 h-6 p-3 relative *:w-4 *:h-4">
                          <IconFile_06 />
                        </div>
                        <span className="text-sm font-medium text-text-primary line-clamp-1 text-ellipsis">{item.name}</span>
                        <button
                          type="button"
                          className="w-6 h-6 p-3 relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4"
                          onClick={(event) => {
                            event.stopPropagation()
                            const newFiles = {
                              file: field.value.file.filter((_, i) => item.index !== i),
                              string: field.value.string.filter((_, i) => item.index !== i),
                            }
                            field.onChange(newFiles)
                          }}
                        >
                          <IconTrashBlack />
                        </button>
                      </article>
                    ))}
                  </div>
                  <div className="w-full grid justify-center gap-4 grid-cols-3 max-md:grid-cols-2">
                    {_strings.images.map((item) => (
                      <CurrentImage
                        key={`${item.index}-image`}
                        item={item.img}
                        index={item.index}
                        //@ts-ignore
                        field={field}
                        progress={!loading ? null : onProgress(field.value.file, item.index, progress)}
                      />
                    ))}
                    {field.value.string.length < 9 ? (
                      <div
                        data-image
                        data-input-plus
                        className="border border-dashed border-grey-stroke-light focus:border-element-accent-1"
                      >
                        <input
                          type="file"
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
                  <i className="!text-text-disabled !-mt-3">Максимальный размер фото - 10 Мб, видео - 50 Мб</i>
                  <i className="!text-text-disabled !-mt-3">Не более 9 файлов</i>
                </fieldset>
              )
            }}
          />
          <ControlParticipant control={control} />
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
