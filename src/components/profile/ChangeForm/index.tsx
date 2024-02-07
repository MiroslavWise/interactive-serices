"use client"

import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"
import { useQueries } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import type { IValuesForm } from "./types/types"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import type { IResponseOffersCategories } from "@/services/offers-categories/types"
import type { IPatchProfileData, IPostProfileData } from "@/services/profile/types"
import type { IFeatureMember, IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import { ImageProfile } from "./components/ImageProfile"
import { Button, ButtonLink } from "@/components/common"
import { BlockCategories } from "./components/BlockCategories"

import { generateShortHash } from "@/lib/hash"
import { useToast } from "@/helpers/hooks/useToast"
import { getLocationName } from "@/lib/location-name"
import { dispatchChangeService, useAuth } from "@/store"
import { useDebounce, useOut, usePush } from "@/helpers"
import { serviceAddresses, getGeocodeSearch, fileUploadService, serviceProfile, serviceUser } from "@/services"

import styles from "./styles/style.module.scss"

export const ChangeForm = () => {
    const [file, setFile] = useState<{ file: File | null; string: string }>({ file: null, string: "" })
    const [stateCategory, setStateCategory] = useState<IResponseOffersCategories[]>([])
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const [text, setText] = useState("")
    const [values, setValues] = useState<IResponseGeocode | null>(null)
    const [activeList, setActiveList] = useState(false)
    const [loadingAddress, setLoadingAddress] = useState(false)
    const debouncedValue = useDebounce(onValueFunc, 1500)
    const { handlePush } = usePush()
    const { out } = useOut()
    const { on } = useToast()
    const {
        register,
        watch,
        setError,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IValuesForm>({ defaultValues: {} })

    const [{ data, refetch }, { data: dataProfile, refetch: refetchProfile, isLoading }] = useQueries({
        queries: [
            {
                queryFn: () => serviceUser.get(),
                queryKey: ["user", { userId: userId }],
                enabled: !!userId!,
                refetchOnMount: true,
                refetchOnReconnect: true,
            },
            {
                queryFn: () => serviceProfile.getUserId(userId!),
                queryKey: ["profile", userId!],
                enabled: !!userId,
                refetchOnMount: true,
                refetchOnReconnect: true,
            },
        ],
    })

    const { res } = data ?? {}
    const categoryProfile = res?.categories || []

    const address = useMemo(() => {
        if (data?.res && data?.res?.addresses?.length > 0) {
            return data?.res?.addresses?.filter((item) => item?.addressType === "main")
        }
        return []
    }, [data?.res?.addresses])

    useEffect(() => {
        if (address?.length > 0) {
            const textAddress = address?.[0]?.additional
            setText(textAddress)
        }
    }, [address])

    useEffect(() => {
        if (categoryProfile?.length > 0) {
            setStateCategory(categoryProfile)
        }
    }, [categoryProfile])

    async function UpdatePhotoProfile(id: number) {
        return fileUploadService(file.file!, {
            type: "profile",
            userId: userId!,
            idSupplements: id!,
        })
    }

    function submit(values: IValuesForm) {
        if (!values.username?.trim()) {
            setError("username", { message: "Обязательно к заполнению" })
            setLoading(false)
            return
        }

        if (!loading) {
            setLoading(true)
            if (
                watch("firstName") !== dataProfile?.res?.firstName ||
                watch("lastName") !== dataProfile?.res?.lastName ||
                watch("username") !== dataProfile?.res?.username ||
                !!file.file
            ) {
                const valuesProfile: IPatchProfileData = {
                    enabled: true,
                }

                if (watch("firstName") !== dataProfile?.res?.firstName) {
                    valuesProfile.firstName = values.firstName
                }
                if (watch("lastName") !== dataProfile?.res?.lastName) {
                    valuesProfile.lastName = values.lastName
                }
                if (watch("username") !== dataProfile?.res?.username) {
                    valuesProfile.username = values.username?.replace("@", "")
                }

                Promise.all([!!dataProfile?.res?.id ? serviceProfile.patch(valuesProfile, dataProfile?.res?.id!) : serviceProfile.post(valuesProfile!)]).then(
                    (responses) => {
                        if (responses?.[0]?.ok) {
                            const idProfile = responses?.[0]?.res?.id!
                            if (file.file) {
                                UpdatePhotoProfile(idProfile).then((response) => {
                                    const dataPatch: IPostProfileData = { imageId: response?.res?.id }
                                    serviceProfile.patch(dataPatch, idProfile).then(() => {
                                        refetchProfile()
                                        flushSync(() => {
                                            handlePush("/profile")
                                        })
                                    })
                                })
                            } else {
                                refetchProfile()
                                flushSync(() => {
                                    handlePush("/profile")
                                })
                            }
                        } else {
                            setLoading(false)
                            if (responses[0]?.error?.code === 409) {
                                return setError("username", { message: "user exists" })
                            }
                            if (responses[0]?.error?.code === 401) {
                                on({
                                    message: "Извините, ваш токен истёк. Перезайдите, пожалуйста!",
                                })
                                out()
                            }
                        }
                    },
                )
            } else {
                handlePush("/profile")
            }
        }
    }

    const onSubmit = handleSubmit(submit)

    useEffect(() => {
        if (dataProfile?.ok) {
            if (!!dataProfile?.res) {
                const { res: resProfile } = dataProfile ?? {}
                setValue("firstName", resProfile?.firstName!)
                setValue("lastName", resProfile?.lastName!)
                setValue("username", resProfile?.username!)
            }
        }
    }, [dataProfile?.res])

    useEffect(() => {
        if (!!res) {
            setValue("email", res?.email!)
        }
    }, [res])

    function onValueFunc() {
        if (text?.length > 2 && activeList) {
            getGeocodeSearch(text)
                .then((response) => setValues(response))
                .finally(() => {
                    setLoadingAddress(false)
                })
        } else {
            setLoadingAddress(false)
        }
    }

    const exactAddresses = useMemo(() => {
        if (!values) {
            return null
        }
        return (
            values?.response?.GeoObjectCollection?.featureMember?.filter((item) =>
                item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.some((_) => _?.kind === "country"),
            ) || null
        )
    }, [values])

    function handleAddress(item: IFeatureMember) {
        const coordinates = item?.GeoObject?.Point?.pos
        const longitude = item?.GeoObject?.Point?.pos?.split(" ")[0]
        const latitude = item?.GeoObject?.Point?.pos?.split(" ")[1]
        const additional = item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
        const value: IPostAddress = {
            addressType: "main",
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
        setText(additional)
        setActiveList(false)

        Promise.all(address.map((item) => serviceAddresses.patch({ enabled: false }, item?.id))).then(() => {
            serviceAddresses.post(value).then((response) => {
                console.log("response address: ", response)
            })
        })
    }

    const disabledButton: boolean = useMemo(() => {
        return (
            watch("firstName") === dataProfile?.res?.firstName &&
            watch("lastName") === dataProfile?.res?.lastName &&
            watch("username") === dataProfile?.res?.username &&
            !file.string
        )
    }, [watch("firstName"), watch("lastName"), watch("username"), dataProfile?.res, file.string])

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <section>
                <h3>Личные данные</h3>
                <ImageProfile idProfile={dataProfile?.res?.id!} image={dataProfile?.res?.image?.attributes?.url!} {...{ file, setFile }} />
                <div data-inputs>
                    <fieldset>
                        <label>Имя</label>
                        <input {...register("firstName")} type="text" placeholder="Введите имя" autoComplete="off" />
                    </fieldset>
                    <fieldset>
                        <label>Фамилия</label>
                        <input {...register("lastName")} type="text" placeholder="Введите фамилию" autoComplete="off" />
                    </fieldset>
                    <fieldset>
                        <label>Ник</label>
                        <input {...register("username")} type="text" placeholder="Придумайте ник" autoComplete="off" />
                        {errors?.username?.message === "user exists" ? <i>Данный ник уже существует</i> : <i>{errors?.username?.message}</i>}
                    </fieldset>
                    <fieldset>
                        <label>Электронная почта</label>
                        <input {...register("email")} type="email" disabled placeholder="email_address@mail.com" autoComplete="off" />
                    </fieldset>
                </div>
                <fieldset>
                    <label>Адрес проживания</label>
                    <input
                        type="text"
                        placeholder="Введите адрес"
                        autoComplete="off"
                        value={text}
                        onChange={(event) => {
                            setLoadingAddress(true)
                            setText(event.target.value || "")
                            debouncedValue()
                        }}
                        onFocus={() => setActiveList(true)}
                    />
                    {loadingAddress ? (
                        <img data-loading src="/svg/spinner.svg" alt="spinner" width={24} height={24} />
                    ) : activeList && exactAddresses && exactAddresses?.length ? (
                        <img
                            data-img-close
                            src="/svg/x-close.svg"
                            alt="x"
                            width={24}
                            height={24}
                            onClick={(event) => {
                                event.stopPropagation()
                                setActiveList(false)
                            }}
                        />
                    ) : null}
                    <div data-absolute data-active={exactAddresses && exactAddresses?.length > 0 && activeList}>
                        <ul>
                            {exactAddresses && Array.isArray(exactAddresses)
                                ? exactAddresses.map((item) => (
                                      <a
                                          key={`::item::address::response::${item?.GeoObject?.uri}::`}
                                          onClick={(event) => {
                                              event.stopPropagation()
                                              handleAddress(item)
                                          }}
                                      >
                                          {item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}
                                      </a>
                                  ))
                                : null}
                        </ul>
                    </div>
                </fieldset>
            </section>
            <section>
                <h3>Желаемые услуги</h3>
                <div data-categories data-length={categoryProfile?.length > 0}>
                    {stateCategory?.length === 0 ? (
                        <>
                            <p>Добавьте услуги, которые вам интересны и вы бы хотели их получить</p>
                            <a
                                onClick={(event) => {
                                    event.stopPropagation()
                                    dispatchChangeService({ visible: true })
                                }}
                            >
                                <span>Добавить</span>
                                <img src="/svg/plus-primary.svg" alt="+" width={16} height={16} />
                            </a>
                        </>
                    ) : stateCategory?.length > 0 ? (
                        <>
                            <a
                                onClick={(event) => {
                                    event.stopPropagation()
                                    dispatchChangeService({ visible: true })
                                }}
                            >
                                <span>Добавить</span>
                                <img src="/svg/plus-primary.svg" alt="+" width={16} height={16} />
                            </a>
                            <BlockCategories stateCategory={stateCategory} refetch={refetch} />
                        </>
                    ) : null}
                </div>
            </section>
            <footer>
                <Button type="submit" typeButton="fill-primary" label="Сохранить" loading={loading || isLoading} disabled={disabledButton} />
                <ButtonLink typeButton="regular-primary" label="Отменить" href={{ pathname: "/profile" }} data-disabled={disabledButton} />
            </footer>
        </form>
    )
}
