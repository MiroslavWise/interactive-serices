"use client"

import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, useEffect, useMemo, useState } from "react"

import type { IFormValues } from "./types/types"
import type { IPostOffers, IQueriesOffers } from "@/services/offers/types"
import type { ISelectList } from "@/components/common/custom/Select/types"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import type { IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import { FinishScreen } from "./components/FinishScreen"
import { CustomSelect } from "@/components/common/custom"
import { ArticleOnboarding } from "@/components/templates"
import { Button, ImageStatic, WalletPay, ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { createAddress } from "@/helpers/address/create"
import { useAddCreateModal, closeCreateOffers, dispatchValidating } from "@/store"
import { transliterateAndReplace, useDebounce, useOutsideClickEvent } from "@/helpers"
import { dispatchOnboarding, useAuth, useFilterMap, useOffersCategories, useOnboarding } from "@/store"
import { getOffers, getUserIdOffers, patchOffer, postOffer, fileUploadService, serviceAddresses, getGeocodeSearch } from "@/services"

import styles from "./styles/style.module.scss"
import { EnumTypeProvider } from "@/types/enum"
import { queryClient } from "@/context"

export const CreateNewOptionModal = () => {
  const [isFirst, setIsFirst] = useState(true)
  const [isFocus, setIsFocus, ref] = useOutsideClickEvent()
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [strings, setStrings] = useState<string[]>([])
  const debouncedValue = useDebounce(onChangeAddress, 200)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [valuesAddresses, setValuesAddresses] = useState<IResponseGeocode | null>(null)
  const userId = useAuth(({ userId }) => userId)
  const step = useOnboarding(({ step }) => step)
  const visible = useOnboarding(({ visible }) => visible)
  const isVisible = useAddCreateModal(({ isVisible }) => isVisible)
  const typeAdd = useAddCreateModal(({ typeAdd }) => typeAdd)
  const categories = useOffersCategories(({ categories }) => categories)
  const addressInit = useAddCreateModal(({ addressInit }) => addressInit)

  const idsNumber = useFilterMap(({ idsNumber }) => idsNumber)

  const obj = idsNumber.length
    ? ({ category: idsNumber.join(","), order: "DESC" } as IQueriesOffers)
    : ({ order: "DESC" } as IQueriesOffers)

  const { refetch } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: typeAdd, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: typeAdd }],
    enabled: false,
  })

  const { refetch: refetchDataMap } = useQuery({
    queryFn: () => getOffers(obj),
    queryKey: ["offers", { category: idsNumber.sort() }],
  })

  const list = useMemo(() => {
    return (
      categories.map(
        (item) =>
          ({
            label: item.title,
            value: item.id,
          } as ISelectList),
      ) || []
    )
  }, [categories])

  const {
    reset,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      categoryId: null,
      title: "",
      address: addressInit ? true : "",
    },
  })

  function create(data: IPostOffers) {
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
                flushSync(() => {
                  setLoading(false)
                  setIsFirst(false)
                  dispatchOnboarding("close")
                  reset()
                })
              })
            } else {
              refetch()
              refetchDataMap()
              flushSync(() => {
                setLoading(false)
                setIsFirst(false)
                dispatchOnboarding("close")
                reset()
              })
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
      data.categoryId = values.categoryId!
    }
    if (!loading) {
      setLoading(true)
      if (values) {
        if (addressInit) {
          createAddressPost(addressInit).then((response) => {
            if (response?.ok) {
              create({
                ...data,
                addresses: [response.res?.id!],
              })
            }
          })
          return
        } else if (watch("addressFeature")) {
          createAddress(watch("addressFeature")).then((response) => {
            if (response?.ok) {
              create({
                ...data,
                addresses: [response.res?.id!],
              })
            }
          })
          return
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
    return (
      valuesAddresses?.response?.GeoObjectCollection?.featureMember?.filter((item) =>
        item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.some((_) => _?.kind === "street"),
      ) || null
    )
  }, [valuesAddresses])

  const onSubmit = handleSubmit(submit)

  const headerTitle =
    typeAdd === EnumTypeProvider.alert
      ? "У меня проблема / Хочу предупредить"
      : typeAdd === EnumTypeProvider.offer
      ? "Добавить предложение"
      : typeAdd === EnumTypeProvider.discussion
      ? "Новое обсуждение"
      : null

  const title =
    typeAdd === EnumTypeProvider.alert
      ? "Опишите, что у вас случилось?"
      : typeAdd === EnumTypeProvider.discussion
      ? "Придумайте заголовок для вашего обсуждения"
      : typeAdd === EnumTypeProvider.offer
      ? "Добавьте текст, чтобы сделать ваше предложение более привлекательным и желанным"
      : null

  const titleAddress =
    typeAdd === EnumTypeProvider.alert
      ? "Введите адрес места происшествия или нужды в помощи"
      : typeAdd === EnumTypeProvider.offer
      ? "Введите адрес, где вам нужна услуга"
      : typeAdd === EnumTypeProvider.discussion
      ? "Введите адрес, где вы хотели бы обсудить проблемы или предложения"
      : null

  const placeholderInput =
    typeAdd === EnumTypeProvider.alert
      ? "Введите свой адрес, чтобы другие люди из вашего района могли увидеть происшествие"
      : typeAdd === EnumTypeProvider.offer
      ? "Введите свой адрес, чтобы мы могли показать ваше предложение на карте. Если вы оказываете услугу он-лайн, оставьте поле пустым"
      : typeAdd === EnumTypeProvider.discussion
      ? "Введите свой адрес, чтобы мы могли показать ваше обсуждение на карте"
      : null

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files

    if (file && file?.length > 0) {
      for (let i = 0; i < file.length; i++) {
        if (file[i]) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setStrings((prev) => [...prev, reader.result as string])
          }
          reader.readAsDataURL(file[i])
          setFiles((prev) => [...prev, file[i]])
        }
      }
    }
  }

  function deletePhoto(index: number) {
    setFiles((prev) => prev.filter((_, i) => index !== i))
    setStrings((prev) => prev.filter((_, i) => index !== i))
  }

  function handleClose() {
    if (!visible) {
      closeCreateOffers()
      setTimeout(() => {
        setFiles([])
        setStrings([])
        reset()
        setIsFirst(true)
      }, 151)
    }
  }

  useEffect(() => {
    if (visible) {
      dispatchValidating({
        isCategoryId: !!watch("categoryId"),
        isTitle: !!watch("title"),
        isFiles: !!files.length,
      })
    }
  }, [watch("title"), watch("categoryId"), files, visible])

  return (
    <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={isVisible}>
      <section id="container-create-option-modal" data-is-onboarding={visible}>
        <ButtonClose position={{ top: 12, right: 12 }} onClick={handleClose} />
        {isFirst ? (
          <>
            {typeAdd ? (
              <header>
                <h3>{headerTitle}</h3>
              </header>
            ) : null}
            <ul id="ul-create-option-modal">
              <form onSubmit={onSubmit}>
                <fieldset id="fieldset-create-option-modal-address" style={{ zIndex: 100 }}>
                  <label htmlFor="address">
                    {addressInit?.additional ? "По адресу" : titleAddress} <sup>*</sup>
                  </label>
                  {addressInit?.additional ? (
                    <p>{addressInit?.additional}</p>
                  ) : (
                    <div data-input-selector {...register("addressFeature", { required: !addressInit?.additional })} ref={ref}>
                      <input
                        {...register("address", { required: true })}
                        onChange={(event) => {
                          setValue("address", event.target.value)
                          debouncedValue()
                          setLoadingAddresses(true)
                        }}
                        type="text"
                        data-error={!!errors.addressFeature}
                        onFocus={() => setIsFocus(true)}
                        placeholder={placeholderInput || ""}
                        disabled={visible && step !== 2}
                        data-focus={visible && step === 2}
                        autoComplete="off"
                      />
                      <div data-select-icon>
                        <img
                          src={loadingAddresses ? "/svg/loading-02.svg" : "/svg/chevron-down.svg"}
                          alt="chevron"
                          width={20}
                          height={20}
                          data-chevron
                          data-loading={loadingAddresses}
                          onClick={(event) => {
                            event.stopPropagation()
                            setIsFocus(false)
                          }}
                        />
                      </div>
                      <ul data-active={isFocus}>
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
                                setIsFocus(false)
                              }}
                            >
                              <span>{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
                            </li>
                          ))
                        ) : (
                          <p>{loadingAddresses ? "Идёт загрузка адресов" : "Не найдено подходящих адресов"}</p>
                        )}
                      </ul>
                    </div>
                  )}
                </fieldset>
                {[EnumTypeProvider.alert, EnumTypeProvider.discussion].includes(typeAdd!) ? (
                  <fieldset id="fieldset-create-option-modal-content-title-alert">
                    <label>
                      Заголовок{" "}
                      {EnumTypeProvider.alert === typeAdd! ? "SOS-cообщения" : EnumTypeProvider.discussion === typeAdd! ? "дискуссии" : ""}
                    </label>
                    <input
                      {...register("content" /* { required: EnumTypeProvider.alert === typeAdd! } */)}
                      type="text"
                      maxLength={32}
                      placeholder="Например, потерял(а) телефон"
                    />
                  </fieldset>
                ) : null}
                {visible && step === 2 && <ArticleOnboarding />}
                {[EnumTypeProvider.offer].includes(typeAdd!) ? (
                  <fieldset {...register("categoryId", { required: true })} id="fieldset-create-option-modal-offer">
                    <label>
                      Предложение <sup>*</sup>
                    </label>
                    <CustomSelect
                      disabled={visible && step !== 2.5}
                      placeholder="Выберите категории"
                      list={list}
                      value={watch("categoryId")}
                      setValue={(value) => {
                        if (value) {
                          setValue("categoryId", value as number)
                        }
                      }}
                      focus={visible && step === 2.5}
                    />
                    {errors?.categoryId ? <i>Важное поле</i> : null}
                  </fieldset>
                ) : null}
                {visible && step === 2.5 && <ArticleOnboarding />}
                <fieldset id="fieldset-create-option-modal-title">
                  <label htmlFor="title">
                    {title} <sup>*</sup>
                  </label>
                  <div data-text-area data-focus={visible && step === 3}>
                    <textarea
                      disabled={visible && step !== 3}
                      maxLength={512}
                      {...register("title", { required: true })}
                      placeholder="Напиши что-нибудь"
                    />
                    <sup>{watch("title")?.length || 0}/512</sup>
                  </div>
                  {errors?.title ? <i>Обязательное поле</i> : null}
                </fieldset>
                {visible && step === 3 && <ArticleOnboarding />}
                <fieldset data-photos id="fieldset-create-option-modal-photos" data-disabled={visible && step !== 3}>
                  <label>Вы можете добавить фото, если хотите</label>
                  <div data-images data-focus={visible && step === 4}>
                    {strings.map((item, index) => (
                      <div key={`${index}-image`} data-image>
                        <ImageStatic data-img src={item} alt="offer" width={304} height={392} />
                        <button
                          data-trash
                          onClick={() => {
                            if (visible && step !== 4) {
                              deletePhoto(index)
                            }
                          }}
                          disabled={visible && step !== 4}
                        >
                          <img src="/svg/trash-black.svg" alt="trash" width={16} height={16} />
                        </button>
                      </div>
                    ))}
                    <div data-image>
                      <img src="/svg/plus-gray.svg" data-plus alt="plus-gray" height={60} width={60} />
                      <input type="file" accept="image/*" onChange={handleImageChange} disabled={visible && step !== 4} multiple />
                    </div>
                  </div>
                </fieldset>
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
                  />
                </div>
              </form>
            </ul>
          </>
        ) : (
          <FinishScreen typeAdd={typeAdd!} setIsFirst={setIsFirst} />
        )}
      </section>
    </div>
  )
}
