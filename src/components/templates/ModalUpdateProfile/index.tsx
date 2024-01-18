"use client"

import dayjs from "dayjs"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import type { IValuesProfile } from "./components/types/types"
import type { IPatchProfileData, IPostProfileData } from "@/services/profile/types/profileService"

import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Content } from "./components/Content"
import { ButtonClose } from "@/components/common"

import { cx } from "@/lib/cx"
import { serviceUser } from "@/services/users"
import { serviceProfile } from "@/services/profile"
import { useOut } from "@/helpers/hooks/useOut"
import { useToast } from "@/helpers/hooks/useToast"
import { fileUploadService } from "@/services/file-upload"
import { useAuth, useUpdateProfile } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const ModalUpdateProfile = () => {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const { out } = useOut()
    const isVisible = useUpdateProfile(({ isVisible }) => isVisible)
    const setVisible = useUpdateProfile(({ setVisible }) => setVisible)
    const userId = useAuth(({ userId }) => userId)
    const { on } = useToast()

    const { data, refetch } = useQuery({
        queryFn: () => serviceUser.getId(userId!),
        queryKey: ["user", userId],
        enabled: isVisible && !!userId,
    })

    const user = data?.res?.profile!

    const dateOfBirth = useMemo(() => {
        const dateOfBirth: any = {
            day: "",
            month: "",
            year: "",
        }
        if (user) {
            const day = user?.birthdate ? Number(dayjs(user?.birthdate).format("DD")) : ""
            const month = user?.birthdate ? dayjs(user?.birthdate).format("MM") : ""
            const year = user?.birthdate ? Number(dayjs(user?.birthdate).format("YYYY")) : ""
            dateOfBirth.day = day
            dateOfBirth.month = month
            dateOfBirth.year = year
        }
        return dateOfBirth
    }, [user])
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        watch,
    } = useForm<IValuesProfile>({})

    useEffect(() => {
        if (data?.res?.email) {
            setValue("email", data?.res?.email!)
        }
        if (user) {
            setValue("firstName", user?.firstName)
            setValue("lastName", user?.lastName)
            setValue("username", user?.username)
            setValue("day", dateOfBirth.day)
            setValue("month", dateOfBirth.month)
            setValue("year", dateOfBirth.year)
            if (isMobile) {
                setValue("about", user?.about || "")
            }
        }
    }, [user, setValue, dateOfBirth, data?.res])

    async function onSubmit(values: IValuesProfile) {
        setLoading(true)
        const dataValues: IPatchProfileData = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            about: user?.about || "",
            enabled: true,
        }

        if (values.month && values.day && values.year) {
            dataValues.birthdate = dayjs(`${values.month}/${values.day}/${values.year}`, "MM/DD/YYYY").format("DD/MM/YYYY")
        }

        if (values.about) {
            dataValues.about = values.about
        }

        Promise.all([data?.res?.profile?.id ? serviceProfile.patch(dataValues, data?.res?.profile?.id!) : serviceProfile.post(dataValues)])
            .then((response) => {
                console.log("response ok: ", response?.[0])
                if (response[0]?.error?.code === 409) return setError("username", { message: "user exists" })
                if (response[0]?.error?.code === 401) {
                    setVisible(false)
                    on(
                        {
                            message: "Извините, ваш токен истёк. Перезайдите, пожалуйста!",
                        },
                        "warning",
                    )
                    out()
                    return
                }
                if (response[0].ok) {
                    if (file) {
                        fileUploadService(file!, {
                            type: "profile",
                            userId: data?.res?.id!,
                            idSupplements: response?.[0]?.res?.id,
                        }).then((uploadResponse) => {
                            if (uploadResponse.ok) {
                                const data: IPostProfileData = {
                                    username: values.username,
                                    imageId: uploadResponse.res?.id,
                                }
                                serviceProfile.patch(data, response?.[0]?.res?.id!).then((responsePatch) => {
                                    if ([401].includes(responsePatch?.error?.code!)) {
                                        setVisible(false)
                                        out()
                                        return
                                    }
                                    refetch()
                                    setVisible(false)
                                })
                                return
                            }
                        })
                    } else {
                        setVisible(false)
                        refetch()
                    }
                } else {
                    on(
                        {
                            message: `Ошибка: ${response[0]?.error?.message || ""}`,
                        },
                        "error",
                    )
                    setVisible(false)
                }
            })
            .finally(() => {
                setVisible(false)
                setLoading(false)
            })
    }

    return (
        <div className={cx("wrapper-fixed", styles.wrapper)} data-visible={isVisible}>
            <section>
                <ButtonClose onClick={() => setVisible(false)} position={{}} />
                {isMobile ? (
                    <header data-header-title>
                        <h3>Редактировать профиль</h3>
                    </header>
                ) : (
                    <h3 data-title>Редактировать профиль</h3>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Header
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        setFile={setFile}
                        imageProfile={user?.image?.attributes?.url!}
                    />
                    <Content errors={errors} register={register} watch={watch} setValue={setValue} />
                    <Footer loading={loading} />
                </form>
            </section>
        </div>
    )
}
