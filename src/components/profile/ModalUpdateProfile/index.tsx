"use client"

import { useMemo, useState } from "react"
import dayjs from "dayjs"

import type { IPostProfileData } from "@/services/profile/types/profileService"
import type { IValuesProfile } from "./components/types/types"

import { ButtonClose } from "@/components/common/Buttons"
import { Glasses } from "@/components/layout/Glasses"
import { Header } from "./components/Header"
import { Content } from "./components/Content"
import { Footer } from "./components/Footer"

import { useForm } from "react-hook-form"
import { useAuth, useUpdateProfile } from "@/store/hooks"
import { cx } from "@/lib/cx"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"

import styles from "./styles/style.module.scss"
import { profileService } from "@/services/profile"
import { fileUploadService } from "@/services/file-upload"

export const ModalUpdateProfile = () => {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const { isVisible, setVisible } = useUpdateProfile()
    const { user, email, profileId, userId, signOut, changeAuth } = useAuth()
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
    } = useForm<IValuesProfile>({
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            username: user?.username || "",
            day: dateOfBirth.day,
            month: dateOfBirth.month,
            year: dateOfBirth.year,
            email: email,
        },
    })

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
            userId: Number(useTokenHelper.authUserId || userId),
        }

        Promise.all([
            !!profileId
                ? profileService.patchProfile(data, profileId!)
                : profileService.postProfile(data),
        ])
            .then((response) => {
                console.log("response ok: ", response?.[0])
                if (response[0]?.error?.code === 409)
                    return setError("username", { message: "user exists" })
                if (
                    response[0]?.error?.code === 401 ||
                    response[0]?.error?.code === 400
                ) {
                    setVisible(false)
                    signOut()
                    return
                }
                if (response[0].ok) {
                    if (file) {
                        fileUploadService(file!, {
                            type: "profile",
                            userId: userId!,
                            profileId: response?.[0]?.res?.id,
                        }).then((uploadResponse) => {
                            if (uploadResponse.ok) {
                                const data: IPostProfileData = {
                                    username: values.username,
                                    imageId: uploadResponse.res?.id,
                                    userId: Number(
                                        useTokenHelper.authUserId || userId,
                                    ),
                                }
                                profileService
                                    .patchProfile(data, response?.[0]?.res?.id!)
                                    .then((responsePatch) => {
                                        if (
                                            [400, 401].includes(
                                                responsePatch?.error?.code!,
                                            )
                                        ) {
                                            signOut()
                                            setVisible(false)
                                            return
                                        }
                                    })
                                    .finally(changeAuth)
                                return
                            }
                        })
                    }
                } else {
                    setVisible(false)
                }
                setVisible(false)
                changeAuth()
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={cx(styles.wrapper, isVisible && styles.active)}>
            <div className={styles.container}>
                <h3 className={styles.updateProfileTitle}>
                    {profileId ? "Редактировать профиль" : "Создать профиль"}{" "}
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
