"use client"

import { AxiosProgressEvent } from "axios"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { ChangeEvent, useEffect, useMemo, useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import type { IPostOffers } from "@/services/offers/types"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import type { IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import { ArticleOnboarding } from "@/components/templates"
import { IconXClose } from "@/components/icons/IconXClose"
import ControllerCategory from "./components/ControllerCategory"
import { Button, WalletPay } from "@/components/common"

import { queryClient } from "@/context"
import { createAddress } from "@/helpers/address/create"
import { useMapOffers } from "@/helpers/hooks/use-map-offers.hook"
import { transliterateAndReplace, useDebounce, useOutsideClickEvent } from "@/helpers"
import {
  useAddCreateModal,
  closeCreateOffers,
  dispatchValidating,
  dispatchModalClose,
  dispatchOnboarding,
  useAuth,
  useOnboarding,
  dispatchModal,
  EModalData,
  useModal,
  useNewServicesBannerMap,
  dispatchOpenPreCloseCreateService,
} from "@/store"
import { useToast } from "@/helpers/hooks/useToast"
import {
  LIMIT_DESCRIPTION,
  type TSchemaCreate,
  resolverAlertAndDiscussion,
  resolverAlertAndDiscussionMap,
  resolverOffer,
  resolverOfferMap,
} from "./utils/create.schema"
import { getUserIdOffers, patchOffer, postOffer, fileUploadService, getGeocodeSearch, getOffersCategories, postAddress } from "@/services"
import {
  descriptionImages,
  headerTitle,
  placeholderDescription,
  titleContent,
  description,
  titlePlaceholderContent,
} from "./constants/titles"
import CurrentImage from "./components/CurrentImage"

const sleep = () => new Promise((r) => setTimeout(r, 50))

export default function CreateNewOptionModal() {
  const [isFocus, setIsFocus, ref] = useOutsideClickEvent()
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(onChangeAddress, 200)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const step = useOnboarding(({ step }) => step)
  const visible = useOnboarding(({ visible }) => visible)
  const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)
  const { refetch: refetchDataMap } = useMapOffers()
  const { on } = useToast()
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []
  const stateModal = useModal(({ data }) => data)
  const initMapAddress = useNewServicesBannerMap(({ addressInit }) => addressInit)

  const [progress, setProgress] = useState<Record<string, AxiosProgressEvent>>({})

  function onUploadProgress(value: AxiosProgressEvent, name: FormDataEntryValue | null) {
    setProgress((prev) => ({
      ...prev,
      [String(name)]: value,
    }))
  }

  const { refetch } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: typeAdd, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: typeAdd }],
    enabled: false,
  })

  const {
    reset,
    watch,
    trigger,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<TSchemaCreate>({
    defaultValues: {
      description: "",
      categoryId: null,
      address: stateModal === EModalData.CreateNewOptionModalMap ? initMapAddress?.additional! : "",
      title: "",
      typeModal: stateModal!,
      initAddress: initMapAddress!,
      file: {
        file: [],
        string: [],
      },

      type: typeAdd!,
    },
    resolver: [EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(typeAdd!)
      ? stateModal === EModalData.CreateNewOptionModal
        ? resolverAlertAndDiscussion
        : resolverAlertAndDiscussionMap
      : typeAdd === EnumTypeProvider.offer
      ? stateModal === EModalData.CreateNewOptionModal
        ? resolverOffer
        : resolverOfferMap
      : undefined,
  })

  console.log("errors: ", errors)

  const onProgress = (files: File[], index: number): number => {
    const file = files[index]
    const name = file?.name

    if (Object.hasOwn(progress, name)) {
      return (progress[name].loaded / (progress[name].total! || 1)) * 100
    }

    return 0
  }

  useEffect(() => {
    function onUnLoad(event: any) {
      dispatchOpenPreCloseCreateService(typeAdd!)
      event.preventDefault()
      event.returnValue = ""

      return `Прерывание`
    }
    window.addEventListener("beforeunload", onUnLoad)

    return () => window.removeEventListener("beforeunload", onUnLoad)
  }, [typeAdd])

  function create(data: IPostOffers, files: File[]) {
    postOffer(data).then((response) => {
      if (!!response.data) {
        if (!!response.data) {
          const id = response.data?.id
          Promise.all(
            files.map((item) =>
              fileUploadService(item!, {
                type: typeAdd!, //offers | discussion | alert
                userId: userId!, // id юзера
                idSupplements: id!, // offers_id
                onUploadProgress: onUploadProgress, // прогресс загрузки
              }),
            ),
          ).then((responses) => {
            if (responses?.length) {
              const ids = [...responses?.filter((item) => !!item.data)?.map((item) => item.data?.id!)]
              patchOffer(
                {
                  images: ids,
                },
                id,
              ).then(() => {
                refetch()
                refetchDataMap()
                setLoading(false)
                dispatchModal(EModalData.SuccessNewOptional)
                dispatchOnboarding("close")
                reset()
              })
            } else {
              refetch()
              refetchDataMap()
              setLoading(false)
              dispatchModal(EModalData.SuccessNewOptional)
              dispatchOnboarding("close")
              reset()
            }
          })
        }
      } else {
        setLoading(false)
        handleClose()
      }
    })
  }

  function submit(values: TSchemaCreate) {
    const regexMoreSpace = /\s+/g
    const description = values.description.trim().replaceAll(regexMoreSpace, " ")
    const data: IPostOffers = {
      provider: typeAdd!,
      description: description,
      slug: transliterateAndReplace(description).slice(0, 254),
      enabled: true,
      desired: true,
    }

    if ([EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(typeAdd!)) {
      const title = values.title.trim().replaceAll(regexMoreSpace, " ")
      if (!!title) {
        data.title = title
        data.slug = transliterateAndReplace(title).slice(0, 254)
      } else {
        if (EnumTypeProvider.alert === typeAdd) {
          data.title = "SOS-сообщение"
          data.slug = transliterateAndReplace("SOS-сообщение").slice(0, 254)
        } else if (EnumTypeProvider.discussion === typeAdd) {
          data.title = "Обсуждение"
          data.slug = transliterateAndReplace("Обсуждение").slice(0, 254)
        }
      }
    }
    if (typeAdd === EnumTypeProvider.offer && values?.categoryId) {
      const title = categories.find((_) => _.id === values.categoryId)?.title

      if (title) {
        data.title = title.slice(0, 143)
        data.slug = transliterateAndReplace(title).slice(0, 254)
      } else {
        data.title = description.slice(0, 144)
      }
    }

    if (values?.categoryId) {
      data.categoryId = Number(values.categoryId!)
    }
    if (!loading) {
      setLoading(true)

      Promise.resolve(
        initMapAddress && stateModal === EModalData.CreateNewOptionModalMap
          ? createAddressPost(initMapAddress)
          : createAddress(values?.addressFeature!, userId!),
      ).then((response) => {
        if (!!response.data) {
          create(
            {
              ...data,
              addresses: [response.data?.id!],
            },
            values.file.file,
          )
        } else {
          setError("root", { message: response?.error?.message })
          setLoading(false)
        }
      })
    }
  }

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

  async function createAddressPost(values: IPostAddress) {
    return postAddress(values)
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

  const onSubmit = handleSubmit(submit)

  async function handleImageChange(
    current: {
      file: File[]
      string: string[]
    },
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const files = event.target.files

    let filesReady = {
      file: [...current.file] as File[],
      string: [...current.string] as string[],
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        if (file) {
          if (file.size < 9.9 * 1024 * 1024) {
            const is = current.file.some((_) => _.size === file.size && _.name === file.name)

            if (is) {
              on({ message: "Вы можете прикрепить одну копию одного изображения" })
              continue
            }

            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (f) {
              filesReady = {
                ...filesReady,
                file: [...filesReady.file, file],
                string: [...filesReady.string, f!.target!.result as string],
              }
            }
          }
        }
      }
    }

    await sleep()

    return Promise.resolve({
      file: filesReady.file.splice(0, 9),
      string: filesReady.string.splice(0, 9),
    })
  }

  function handleClose() {
    if (!visible) {
      closeCreateOffers()
      dispatchModalClose()
    }
  }

  useEffect(() => {
    if (visible) {
      dispatchValidating({
        isCategoryId: !!watch("categoryId") || !!watch("title")?.trim(),
        isTitle: !!watch("description"),
        isFiles: !!watch("file.file").length,
      })
    }
  }, [watch("description"), watch("categoryId"), watch("title"), watch("file.file"), visible])

  const isEmptySearch = !loadingAddresses && Array.isArray(valuesAddresses?.response?.GeoObjectCollection?.featureMember)
  const focusAddress = () => setIsFocus(true)
  const blurAddress = () => setIsFocus(false)

  return (
    <>
      {typeAdd ? (
        <header>
          <h3>{headerTitle(typeAdd)}</h3>
        </header>
      ) : null}
      <ul id="ul-create-option-modal" data-test="ul-create-new-option">
        <form onSubmit={onSubmit} data-test="from-create-new-option">
          <Controller
            name="address"
            control={control}
            rules={{
              required: stateModal === EModalData.CreateNewOptionModal,
            }}
            render={({ field, fieldState: { error } }) => (
              <fieldset
                id="fieldset-create-option-modal-address"
                style={{ zIndex: 100 }}
                data-test="fieldset-create-new-option-addressInit"
                ref={ref}
              >
                <label htmlFor={field.name} title="Ваш адрес">
                  Ваш адрес
                </label>
                <div data-input-selector>
                  <input
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.value)
                      debouncedValue()
                      setLoadingAddresses(true)
                    }}
                    value={stateModal === EModalData.CreateNewOptionModalMap ? initMapAddress?.additional : field.value}
                    type="text"
                    data-error={!!errors.addressFeature}
                    onFocus={focusAddress}
                    placeholder="Введите адрес"
                    disabled={(visible && step !== 2) || (stateModal === EModalData.CreateNewOptionModalMap && !!initMapAddress)}
                    data-focus={visible && step === 2}
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
                            dispatchValidating({
                              isAddress: !!item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text!,
                            })
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
          {[EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(typeAdd!) ? (
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <fieldset id="fieldset-create-option-modal-offer" data-test="fieldset-create-new-option-title">
                  <label htmlFor={field.name}>{titleContent(typeAdd!)}</label>
                  <input
                    {...field}
                    onChange={(event) => field.onChange(event.target.value.replace(/\s{2,}/g, " "))}
                    type="text"
                    placeholder={titlePlaceholderContent(typeAdd!)}
                    data-error={!!error}
                  />
                  {!!error ? <i>{error.message}</i> : null}
                </fieldset>
              )}
            />
          ) : null}
          {visible && step === 2 && <ArticleOnboarding />}
          {[EnumTypeProvider.offer].includes(typeAdd!) ? (
            <ControllerCategory control={control} visible={visible} disabled={visible && step !== 2.5} />
          ) : null}
          {visible && step === 2.5 && <ArticleOnboarding />}
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <fieldset id="fieldset-create-option-modal-title" data-test="fieldset-create-new-option-description">
                <label htmlFor={field.name}>{description(typeAdd!)}</label>
                <div data-text-area data-focus={visible && step === 3}>
                  <textarea
                    disabled={visible && step !== 3}
                    {...field}
                    placeholder={placeholderDescription(typeAdd!)}
                    data-error={!!error}
                    maxLength={LIMIT_DESCRIPTION + 2}
                  />
                  <span data-error={field.value?.length + 20 >= LIMIT_DESCRIPTION}>
                    {field.value?.length || 0}/{LIMIT_DESCRIPTION}
                  </span>
                </div>
                {!!error ? <i>{error.message}</i> : null}
              </fieldset>
            )}
          />
          {visible && step === 3 && <ArticleOnboarding />}
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <fieldset
                data-photos
                id="fieldset-create-option-modal-photos"
                data-disabled={visible && step !== 3}
                data-test="fieldset-create-new-option-images"
              >
                <label htmlFor={field.name}>Фото или видео</label>
                <p>{descriptionImages(typeAdd!)}</p>
                <div data-images data-focus={visible && step === 4}>
                  {field.value.string.map((item, index) => (
                    <CurrentImage
                      key={`${index}-image`}
                      item={item}
                      index={index}
                      field={field}
                      progress={!loading ? null : onProgress(field.value.file, index)}
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
                        disabled={visible && step !== 4}
                        multiple
                      />
                    </div>
                  ) : null}
                </div>
                <i>Максимальный размер фото - 10 МБ</i>
                <i>Не более 9 изображений</i>
              </fieldset>
            )}
          />
          {visible && [4, 5].includes(step) && <ArticleOnboarding />}
          {typeAdd === "offer" ? <WalletPay /> : null}
          <div data-footer>
            <Button
              type="submit"
              typeButton="fill-primary"
              label="Создать"
              disabled={loading}
              loading={loading}
              id="button-create-option-modal-submit"
              data-test="button-create-new-option-submit"
            />
          </div>
        </form>
      </ul>
    </>
  )
}
