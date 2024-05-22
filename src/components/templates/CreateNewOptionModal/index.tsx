"use client"

import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { ChangeEvent, useEffect, useMemo, useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import type { IFormValues } from "./types/types"
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
import { descriptionImages, headerTitle, placeholderDescription, titleContent, title, titlePlaceholderContent } from "./constants/titles"
import { getUserIdOffers, patchOffer, postOffer, fileUploadService, serviceAddresses, getGeocodeSearch } from "@/services"
import { useToast } from "@/helpers/hooks/useToast"

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
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      categoryId: null,
      title: "",
      address: "",
      content: "",
      file: {
        file: [],
        string: [],
      },
    },
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

  function submit(values: IFormValues) {
    const data: IPostOffers = {
      provider: typeAdd!,
      title: values?.title || "",
      slug: transliterateAndReplace(values.title),
      enabled: true,
      desired: true,
    }

    if ([EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(typeAdd!)) {
      if (values.content) {
        data.content = values.content
      } else {
        if (EnumTypeProvider.alert === typeAdd) {
          data.content = "SOS-сообщение"
        } else if (EnumTypeProvider.discussion === typeAdd) {
          data.content = "Дискуссия"
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
        createAddress(values.addressFeature).then((response) => {
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

    const addresses = valuesAddresses?.response?.GeoObjectCollection?.featureMember?.filter(
      (item) =>
        item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components.some((item) => item.kind === "street") &&
        item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components.some((item) => item.kind === "locality") &&
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
        isCategoryId: !!watch("categoryId") || !!watch("content")?.trim(),
        isTitle: !!watch("title"),
        isFiles: !!watch("file.file").length,
      })
    }
  }, [watch("title"), watch("categoryId"), watch("content"), watch("file.file"), visible])

  const disabledButton =
    (stateModal === EModalData.CreateNewOptionModal ? !watch("addressFeature") : false) ||
    !watch("title")?.trim() ||
    (typeAdd === EnumTypeProvider.offer ? !watch("categoryId") : false)

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
          <fieldset
            id="fieldset-create-option-modal-address"
            style={{ zIndex: 100 }}
            data-test="fieldset-create-new-option-addressInit"
            ref={ref}
          >
            <label htmlFor="address">Ваш адрес</label>
            <div data-input-selector {...register("addressFeature", { required: stateModal === EModalData.CreateNewOptionModal })}>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: stateModal === EModalData.CreateNewOptionModal,
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    onChange={(event) => {
                      setValue("address", event.target.value)
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
                )}
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
                        setValue("addressFeature", item)
                        setValue("address", item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text!)
                        blurAddress()
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
          </fieldset>
          {[EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(typeAdd!) ? (
            <fieldset id="fieldset-create-option-modal-offer" data-test="fieldset-create-new-option-title">
              <label>{titleContent(typeAdd!)}</label>
              <input {...register("content")} type="text" maxLength={32} placeholder={titlePlaceholderContent(typeAdd!)} />
            </fieldset>
          ) : null}
          {visible && step === 2 && <ArticleOnboarding />}
          {[EnumTypeProvider.offer].includes(typeAdd!) ? (
            <ControllerCategory control={control} visible={visible} disabled={visible && step !== 2.5} />
          ) : null}
          {visible && step === 2.5 && <ArticleOnboarding />}
          <fieldset id="fieldset-create-option-modal-title" data-test="fieldset-create-new-option-description">
            <label htmlFor="title">{title(typeAdd!)}</label>
            <div data-text-area data-focus={visible && step === 3}>
              <textarea
                disabled={visible && step !== 3}
                maxLength={512}
                {...register("title", { required: true })}
                placeholder={placeholderDescription(typeAdd!)}
              />
              <sup>{watch("title")?.length || 0}/512</sup>
            </div>
            {errors?.title ? <i>Обязательное поле</i> : null}
          </fieldset>
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
              disabled={loading || disabledButton}
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
