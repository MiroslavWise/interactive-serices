"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import type { IValuesForm } from "./types/types"
import type { IResponseOffersCategories } from "@/services/offers-categories/types"
import type { IPatchProfileData, IPostProfileData } from "@/services/profile/types/profileService"

import { ImageProfile } from "./components/ImageProfile"
import { Button, ButtonLink } from "@/components/common"

import { useOut, usePush } from "@/helpers"
import { IconCategory } from "@/lib/icon-set"
import { serviceUsers } from "@/services/users"
import { serviceProfile } from "@/services/profile"
import { useToast } from "@/helpers/hooks/useToast"
import { fileUploadService } from "@/services/file-upload"
import { useAuth, useOffersCategories } from "@/store/hooks"
import { COLOR_CARD_CATEGORY } from "@/lib/color-card-category"

import styles from "./styles/style.module.scss"

export const ChangeForm = () => {
    const [file, setFile] = useState<{ file: File | null; string: string }>({
        file: null,
        string: "",
    })
    const [stateCategory, setStateCategory] = useState<IResponseOffersCategories[]>([])
    const [loading, setLoading] = useState(false)
    const userId = useAuth(({ userId }) => userId)
    const { handlePush } = usePush()
    const categories = useOffersCategories(({ categories }) => categories)
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
    const { data } = useQuery({
        queryFn: () => serviceUsers.getMe(),
        queryKey: ["user", userId!],
        enabled: !!userId!,
    })

    const { data: dataProfile, refetch: refetchProfile } = useQuery({
        queryFn: () => serviceProfile.getUserId(userId!),
        queryKey: ["profile", userId!],
        enabled: !!userId,
    })

    const { res } = data ?? {}
    const categoryProfile = res?.categories || []

    useEffect(() => {
        if (categoryProfile?.length > 0) {
            setStateCategory(categoryProfile)
        }
    }, [categoryProfile])

    const categoriesMain = useMemo(() => {
        return categories?.filter((item) => item?.provider === "main") || []
    }, [categories])

    async function UpdatePhotoProfile(id: number) {
        return fileUploadService(file.file!, {
            type: "profile",
            userId: userId!,
            idSupplements: id!,
        })
    }

    function submit(values: IValuesForm) {
        if (!loading) {
            setLoading(true)
            if (
                watch("firstName") !== dataProfile?.res?.firstName ||
                watch("lastName") !== dataProfile?.res?.lastName ||
                watch("username") !== dataProfile?.res?.username ||
                !!file.file
            ) {
                const valuesProfile: IPatchProfileData = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    username: values.username,
                    enabled: true,
                }

                Promise.all([
                    !!dataProfile?.res?.id
                        ? serviceProfile.patch(valuesProfile, dataProfile?.res?.id!)
                        : serviceProfile.post(valuesProfile!),
                ]).then((responses) => {
                    if (responses?.[0]?.ok) {
                        const idProfile = responses?.[0]?.res?.id!
                        if (file.file) {
                            UpdatePhotoProfile(idProfile).then((response) => {
                                const dataPatch: IPostProfileData = {
                                    username: values.username,
                                    imageId: response.res?.id,
                                }
                                serviceProfile.patch(dataPatch, idProfile).then(() => {
                                    refetchProfile().then(() => {
                                        handlePush("/profile")
                                    })
                                })
                            })
                        } else {
                            refetchProfile().then(() => {
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
                })
            }
        }
    }

    const onSubmit = handleSubmit(submit)

    function handleDeleteCategory(id: number) {}

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

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <section>
                <h3>Личные данные</h3>
                <ImageProfile image={dataProfile?.res?.image?.attributes?.url!} {...{ file, setFile }} />
                <div data-inputs>
                    <fieldset>
                        <label>Имя</label>
                        <input {...register("firstName")} type="text" placeholder="Имя" />
                    </fieldset>
                    <fieldset>
                        <label>Фамилия</label>
                        <input {...register("lastName")} type="text" placeholder="Фамилия" />
                    </fieldset>
                    <fieldset>
                        <label>Ник</label>
                        <input {...register("username")} type="text" placeholder="@username" />
                    </fieldset>
                    <fieldset>
                        <label>Электронная почта</label>
                        <input {...register("email")} type="email" disabled placeholder="email_address@mail.com" />
                    </fieldset>
                </div>
                <fieldset>
                    <label>Адрес проживания</label>
                    <input type="text" placeholder="Россия, Санкт-Петербург, ул. Рубинштейна, 24, строение 1" />
                </fieldset>
            </section>
            <section>
                <h3>Желаемые услуги</h3>
                <div data-categories data-length={categoryProfile?.length > 0}>
                    {stateCategory?.length === 0 ? (
                        <>
                            <p>Добавьте услуги, которые вам интересны и вы бы хотели их получить</p>
                            <Link href={{ pathname: "/profile/change/add-services" }}>
                                <span>Добавить</span>
                                <img src="/svg/plus-primary.svg" alt="+" width={16} height={16} />
                            </Link>
                        </>
                    ) : stateCategory?.length > 0 ? (
                        <>
                            <Link href={{ pathname: "/profile/change/add-services" }}>
                                <span>Добавить</span>
                                <img src="/svg/plus-primary.svg" alt="+" width={16} height={16} />
                            </Link>
                            <div data-cards>
                                {stateCategory?.map((item) => (
                                    <a key={`::${item.id}::key::category::form::`}>
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                handleDeleteCategory(item.id)
                                            }}
                                        >
                                            <img src="/svg/x-close.svg" alt="X" width={16} height={16} />
                                        </button>
                                        <article data-title>
                                            <div data-img>
                                                <img
                                                    src={IconCategory(item.id!)}
                                                    alt="cat"
                                                    height={16}
                                                    width={16}
                                                    onError={(error: any) => {
                                                        if (error?.target) {
                                                            try {
                                                                error.target.src = `/svg/category/default.svg`
                                                            } catch (e) {
                                                                console.log("catch e: ", e)
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <p>{categoriesMain?.find((itemC) => itemC.slug === item.provider)?.title!}</p>
                                        </article>
                                        <article data-sub>
                                            <p>{item.title}</p>
                                        </article>
                                    </a>
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            </section>
            <footer>
                <Button type="submit" typeButton="fill-primary" label="Сохранить" loading={loading} />
                <ButtonLink typeButton="regular-primary" label="Отменить" href={{ pathname: "/profile" }} />
            </footer>
        </form>
    )
}
