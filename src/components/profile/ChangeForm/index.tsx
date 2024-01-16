"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import type { IValuesForm } from "./types/types"
import type { IResponseOffersCategories } from "@/services/offers-categories/types"
import type { IPatchProfileData, IPostProfileData } from "@/services/profile/types/profileService"

import { ImageProfile } from "./components/ImageProfile"
import { Button, ButtonLink } from "@/components/common"

import { useAuth } from "@/store/hooks"
import { useOut, usePush } from "@/helpers"
import { serviceUsers } from "@/services/users"
import { serviceProfile } from "@/services/profile"
import { useToast } from "@/helpers/hooks/useToast"
import { fileUploadService } from "@/services/file-upload"
import { BlockCategories } from "./components/BlockCategories"

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
    const { data, refetch } = useQuery({
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
                        {errors?.username?.message === "user exists" ? <i>Данный ник уже существует</i> : null}
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
                            <BlockCategories stateCategory={stateCategory} refetch={refetch} />
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
