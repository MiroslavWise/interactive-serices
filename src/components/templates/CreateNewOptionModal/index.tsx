"use client"

import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, useEffect, useMemo, useState } from "react"

import type { IFormValues } from "./types/types"
import type { IPostOffers, IQueriesOffers } from "@/services/offers/types"
import type { ISelectList } from "@/components/common/custom/Select/types"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"

import { ArticleOnboarding } from "@/components/templates"
import { Button, ImageStatic } from "@/components/common"
import { ButtonClose } from "@/components/common/Buttons"
import { CustomSelect } from "@/components/common/custom"

import { cx } from "@/lib/cx"
import { generateShortHash } from "@/lib/hash"
import { serviceOffers } from "@/services/offers"
import { serviceAddresses } from "@/services/addresses"
import { getLocationName } from "@/lib/location-name"
import { fileUploadService } from "@/services/file-upload"
import { FinishScreen } from "./components/FinishScreen"
import { dispatchOnboarding, useAuth, useFilterMap, useOffersCategories, useOnboarding, useProviderProfileOffer } from "@/store/hooks"
import { transliterateAndReplace, useDebounce, useOutsideClickEvent } from "@/helpers"
import { useAddCreateModal, closeCreateOffers, dispatchValidating } from "@/store/hooks"
import { getGeocodeSearch } from "@/services/addresses/geocodeSearch"
import { IFeatureMember, IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import styles from "./styles/style.module.scss"
import { flushSync } from "react-dom"

export const CreateNewOptionModal = () => {
    const [isFirst, setIsFirst] = useState(true)
    const [isFocus, setIsFocus, ref] = useOutsideClickEvent()
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [strings, setStrings] = useState<string[]>([])
    const debouncedValue = useDebounce(onChangeAddress, 600)
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

    const obj = idsNumber.length ? ({ category: idsNumber.join(","), order: "DESC" } as IQueriesOffers) : ({ order: "DESC" } as IQueriesOffers)

    const { refetch } = useQuery({
        queryFn: () => serviceOffers.getUserId(userId!, { provider: typeAdd, order: "DESC" }),
        queryKey: ["offers", `user=${userId}`, `provider=${typeAdd}`],
        enabled: false,
    })

    const { refetch: refetchDataMap } = useQuery({
        queryKey: ["offers", `category=${idsNumber.join(":")}`],
        queryFn: () => serviceOffers.get(obj),
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
        serviceOffers.post(data).then((response) => {
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
                            serviceOffers
                                .patch(
                                    {
                                        images: ids,
                                    },
                                    id,
                                )
                                .then(() => {
                                    Promise.all([refetch()]).then(() => {
                                        refetchDataMap()
                                        flushSync(() => {
                                            setLoading(false)
                                            setIsFirst(false)
                                            dispatchOnboarding("close")
                                            reset()
                                        })
                                    })
                                })
                        } else {
                            Promise.all([refetch()]).then(() => {
                                refetchDataMap()
                                flushSync(() => {
                                    setLoading(false)
                                    setIsFirst(false)
                                    dispatchOnboarding("close")
                                    reset()
                                })
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
                } else {
                    return
                }
            }
        }
    }

    function onChangeAddress() {
        if (watch("address")?.length > 2 && isFocus) {
            getGeocodeSearch(watch("address"))
                .then((response) => setValuesAddresses(response))
                .finally(() => {
                    setLoadingAddresses(false)
                })
        }
    }

    async function createAddress(item: IFeatureMember) {
        const coordinates = item?.GeoObject?.Point?.pos
        const longitude = item?.GeoObject?.Point?.pos?.split(" ")[0]
        const latitude = item?.GeoObject?.Point?.pos?.split(" ")[1]
        const additional = item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
        const value: IPostAddress = {
            addressType: item!?.GeoObject!?.metaDataProperty!?.GeocoderMetaData!?.kind!,
            enabled: true,
        }
        const country = getLocationName(item, "country")
        const street = getLocationName(item, "street")
        const house = getLocationName(item, "house")
        const city = getLocationName(item, "locality")
        const region = getLocationName(item, "province")
        const district = getLocationName(item, "area")
        if (longitude) value.longitude = longitude
        if (latitude) value.latitude = latitude
        if (country) value.country = country
        if (street) value.street = street
        if (house) value.house = house
        if (city) value.city = city
        if (region) value.region = region
        if (district) value.district = district
        if (coordinates) value.coordinates = coordinates
        if (additional) value.additional = additional
        const hash = generateShortHash(additional!)
        if (hash) value.hash = hash

        return serviceAddresses.post(value)
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
        typeAdd === "alert"
            ? "У меня проблема / Хочу предупредить"
            : typeAdd === "offer"
            ? "Добавить предложение"
            : typeAdd === "discussion"
            ? "Новое обсуждение"
            : null

    const title =
        typeAdd === "alert"
            ? "Что же произошло на самом деле?"
            : typeAdd === "discussion"
            ? "Придумайте заголовок для вашего обсуждения"
            : typeAdd === "offer"
            ? "Добавьте текст, чтобы сделать ваше предложение более привлекательным и желанным"
            : null

    const titleAddress =
        typeAdd === "alert"
            ? "Введите адрес места происшествия или нужды в помощи"
            : typeAdd === "offer"
            ? "Введите адрес, где вам нужна услуга"
            : typeAdd === "discussion"
            ? "Введите адрес, где вы хотели бы обсудить проблемы или предложения"
            : null

    const placeholderInput =
        typeAdd === "alert"
            ? "Введите свой адрес, чтобы другие люди из вашего района могли увидеть происшествие"
            : typeAdd === "offer"
            ? "Введите свой адрес, чтобы мы могли показать ваше предложение на карте. Если вы оказываете услугу он-лайн, оставьте поле пустым"
            : typeAdd === "discussion"
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
                                        <div data-input-selector {...register("addressFeature", { required: true })} ref={ref}>
                                            <input
                                                {...register("address", { required: true })}
                                                onChange={(event) => {
                                                    setValue("address", event.target.value)
                                                    debouncedValue()
                                                    setLoadingAddresses(true)
                                                }}
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
                                {visible && step === 2 && <ArticleOnboarding />}
                                {["offer"].includes(typeAdd!) ? (
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
