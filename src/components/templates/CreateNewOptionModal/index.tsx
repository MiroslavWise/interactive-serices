"use client"

import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { ChangeEvent, useEffect, useMemo, useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import type { IPostOffers } from "@/services/offers/types"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import type { IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import { ArticleOnboarding } from "@/components/templates"
import { IconXClose } from "@/components/icons/IconXClose"
import IconTrashBlack from "@/components/icons/IconTrashBlack"
import ControllerCategory from "./components/ControllerCategory"
import { Button, ImageStatic, WalletPay } from "@/components/common"

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
import { getUserIdOffers, patchOffer, postOffer, fileUploadService, serviceAddresses, getGeocodeSearch } from "@/services"
import {
  descriptionImages,
  headerTitle,
  placeholderDescription,
  titleContent,
  description,
  titlePlaceholderContent,
} from "./constants/titles"

const sleep = () => new Promise((r) => setTimeout(r, 50))

export default function CreateNewOptionModal() {
  const [isFocus, setIsFocus, ref] = useOutsideClickEvent()
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(onChangeAddress, 200)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const userId = useAuth(({ userId }) => userId)
  const step = useOnboarding(({ step }) => step)
  const visible = useOnboarding(({ visible }) => visible)
  const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)
  const { refetch: refetchDataMap } = useMapOffers()
  const { on } = useToast()

  const stateModal = useModal(({ data }) => data)
  const initMapAddress = useNewServicesBannerMap(({ addressInit }) => addressInit)

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

  function create(data: IPostOffers, files: File[]) {
    postOffer(data).then((response) => {
      if (response.ok) {
        if (response.res) {
          const id = response.res?.id
          Promise.all(
            files.map((item) =>
              fileUploadService(item!, {
                type: typeAdd!,
                userId: userId!,
                idSupplements: id!,
              }),
            ),
          ).then((responses) => {
            if (responses?.length) {
              const ids = [...responses?.filter((item) => item.ok)?.map((item) => item.res?.id!)]
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
      slug: transliterateAndReplace(description),
      enabled: true,
      desired: true,
    }

    if ([EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(typeAdd!)) {
      const title = values.title.trim().replaceAll(regexMoreSpace, " ")
      if (!!title) {
        data.title = title
      } else {
        if (EnumTypeProvider.alert === typeAdd) {
          data.title = "SOS-сообщение"
        } else if (EnumTypeProvider.discussion === typeAdd) {
          data.title = "Дискуссия"
        }
      }
    }

    if (values?.categoryId) {
      data.categoryId = Number(values.categoryId!)
    }
    if (!loading) {
      setLoading(true)
      if (initMapAddress && stateModal === EModalData.CreateNewOptionModalMap) {
        createAddressPost(initMapAddress).then((response) => {
          if (response?.ok) {
            create(
              {
                ...data,
                addresses: [response.res?.id!],
              },
              values.file.file,
            )
          }
        })
      } else {
        if (values?.addressFeature!) {
          createAddress(values?.addressFeature!).then((response) => {
            if (response?.ok) {
              create(
                {
                  ...data,
                  addresses: [response.res?.id!],
                },
                values.file.file,
              )
            }
          })
        }
      }
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
    return serviceAddresses.post(values)
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

  function deletePhoto(values: { file: File[]; string: string[] }, index: number) {
    return {
      file: values.file.filter((_, i) => index !== i),
      string: values.string.filter((_, i) => index !== i),
    }
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
                {!!error || !!errors.addressFeature ? <i>Поле не может оставаться незаполненным</i> : null}
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
                <label htmlFor="title">{description(typeAdd!)}</label>
                <div data-text-area data-focus={visible && step === 3}>
                  <textarea
                    disabled={visible && step !== 3}
                    {...field}
                    placeholder={placeholderDescription(typeAdd!)}
                    data-error={!!error}
                  />
                  <sup data-error={field.value?.length + 20 >= LIMIT_DESCRIPTION}>
                    {field.value?.length || 0}/{LIMIT_DESCRIPTION}
                  </sup>
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
                  {field.value.string.map((item, index) => {
                    return (
                      <div key={`${index}-image`} data-image>
                        <ImageStatic data-img src={item! as string} alt="offer" width={304} height={392} />
                        <button
                          type="button"
                          data-trash
                          onClick={() => {
                            const deleteData = deletePhoto(field.value, index)
                            field.onChange(deleteData)
                          }}
                        >
                          <IconTrashBlack />
                        </button>
                      </div>
                    )
                  })}
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
