"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"
import { useEffect, useMemo, useState } from "react"

import type { IValuesProfile } from "./components/types/types"
import type { IPostProfileData } from "@/services/profile/types/profileService"

import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Content } from "./components/Content"
import { Glasses } from "@/components/layout/Glasses"
import { ButtonClose } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { serviceProfile } from "@/services/profile"
import { useOut } from "@/helpers/hooks/useOut"
import { fileUploadService } from "@/services/file-upload"
import { useAuth, useUpdateProfile } from "@/store/hooks"

import styles from "./styles/style.module.scss"
import mobileStyles from "./styles/mobile.module.scss"

export const ModalUpdateProfile = () => {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const { isVisible, setVisible } = useUpdateProfile()
    const { user, email, profileId, userId, changeAuth } = useAuth()
    const { out } = useOut()
    const dateOfBirth = useMemo(() => {
        const dateOfBirth: any = {
            day: "",
            month: "",
            year: "",
        }
        if (user) {
            const day = user?.birthdate
                ? Number(dayjs(user?.birthdate).format("DD"))
                : ""
            const month = user?.birthdate
                ? dayjs(user?.birthdate).format("MM")
                : ""
            const year = user?.birthdate
                ? Number(dayjs(user?.birthdate).format("YYYY"))
                : ""
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
        if (user) {
            setValue("firstName", user?.firstName)
            setValue("lastName", user?.lastName)
            setValue("username", user?.username)
            setValue("day", dateOfBirth.day)
            setValue("month", dateOfBirth.month)
            setValue("year", dateOfBirth.year)
            setValue("email", email!)
            if (isMobile) {
                setValue("about", user?.about || "")
            }
        }
    }, [user, setValue, dateOfBirth, email])

    async function onSubmit(values: IValuesProfile) {
        setLoading(true)
        const data: IPostProfileData = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            birthdate: dayjs(
                `${values.month}/${values.day}/${values.year}`,
                "MM/DD/YYYY",
            ).format("DD/MM/YYYY"),
            about: user?.about || "",
            enabled: true,
        }

        if (values.about) {
            data.about = values.about
        }

        Promise.all([
            !!profileId
                ? serviceProfile.patch(data, profileId!)
                : serviceProfile.post(data),
        ])
            .then((response) => {
                console.log("response ok: ", response?.[0])
                if (response[0]?.error?.code === 409)
                    return setError("username", { message: "user exists" })
                if (response[0]?.error?.code === 401) {
                    setVisible(false)
                    out()
                    return
                }
                if (response[0].ok) {
                    if (file) {
                        fileUploadService(file!, {
                            type: "profile",
                            userId: userId!,
                            idSupplements: response?.[0]?.res?.id,
                        }).then((uploadResponse) => {
                            if (uploadResponse.ok) {
                                const data: IPostProfileData = {
                                    username: values.username,
                                    imageId: uploadResponse.res?.id,
                                }
                                serviceProfile
                                    .patch(data, response?.[0]?.res?.id!)
                                    .then((responsePatch) => {
                                        if (
                                            [401].includes(
                                                responsePatch?.error?.code!,
                                            )
                                        ) {
                                            setVisible(false)
                                            out()
                                            return
                                        }
                                        setVisible(false)
                                        changeAuth()
                                    })
                                return
                            }
                        })
                    }
                } else {
                    setVisible(false)
                    changeAuth()
                }
            })
            .finally(() => {
                setVisible(false)
                setLoading(false)
            })
    }

    if (isMobile) {
        return (
            <div
                className={cx(
                    mobileStyles.wrapper,
                    isVisible && mobileStyles.visible,
                )}
            >
                <div className={mobileStyles.headerTitle}>
                    <h3>Редактировать профиль</h3>
                    <div
                        className={mobileStyles.back}
                        onClick={() => setVisible(false)}
                    >
                        <Image
                            src="/svg/chevron-left.svg"
                            alt="chevron-left"
                            height={24}
                            width={24}
                        />
                    </div>
                </div>
                <ul>
                    <Header
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        setFile={setFile}
                    />
                    <Content
                        errors={errors}
                        register={register}
                        watch={watch}
                        setValue={setValue}
                    />
                    <Footer loading={loading} />
                </ul>
                <Glasses />
            </div>
        )
    }

    return (
        <div className={cx(styles.wrapper, isVisible && styles.active)}>
            <div className={styles.container}>
                <h3 className={styles.updateProfileTitle}>
                    Редактировать профиль
                </h3>
                <ul>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Header
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            setFile={setFile}
                        />
                        <Content
                            errors={errors}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                        />
                        <Footer loading={loading} />
                    </form>
                </ul>
                <ButtonClose
                    onClick={() => setVisible(false)}
                    position={{
                        right: 12,
                        top: 12,
                    }}
                />
                <Glasses />
            </div>
        </div>
    )
}
