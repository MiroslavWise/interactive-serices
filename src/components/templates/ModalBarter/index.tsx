"use client"

import dayjs from "dayjs"
import Image from "next/image"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { isMobile } from "react-device-detect"

import type { IValuesForm } from "./types/types"
import type { IPostDataBarter } from "@/services/barters/types"

import { Header } from "./components/Header"
import { Content } from "./components/Content"
import { Glasses } from "@/components/layout/Glasses"
import { ButtonClose } from "@/components/common/Buttons"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { serviceBarters } from "@/services/barters"
import { useAuth, useVisibleModalBarter } from "@/store/hooks"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { useBalloonCard } from "@/store/state/useBalloonCard"

import styles from "./styles/style.module.scss"

export function Barter() {
    const { on } = useToast()
    const { userId } = useAuth()
    const { dispatch } = useBalloonCard()
    const { isVisible, dispatchVisibleBarter, dataProfile, dataOffer } =
        useVisibleModalBarter()
    const address: string = useMemo(() => {
        const addressOne = dataOffer?.addresses?.[0]?.additional

        return addressOne || ""
    }, [dataOffer])
    const addressId: number | null = useMemo(() => {
        const address = dataOffer?.addresses?.[0]?.id

        return address || null
    }, [dataOffer])

    const {
        register,
        watch,
        setError,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IValuesForm>({
        defaultValues: {
            year: dayjs().format("YYYY"),
            month: dayjs().format("MM")
        },
    })

    function onSubmit(values: IValuesForm) {
        const data = {
            consignedId: dataOffer?.id!,
            provider: "barter",
            status: "initiated",
            title: dataOffer?.title!,
            enabled: true,
        } as IPostDataBarter

        const day = values.day
        const month = values.month
        const year = values.year

        data.timestamp = dayjs(`${day}/${month}/${year}`, "DD/MM/YYYY").format()

        if (addressId) {
            data.addresses = [Number(addressId)]
        }
        data.userId = Number(userId!)
        data.initialId = Number(values?.offerMyId!)

        serviceBarters.post(data).then((response) => {
            if (response?.ok) {
                if (response?.res?.id) {
                    on(
                        `${dataProfile?.fullName} получит ваше предложение на обмен!`,
                    )
                    dispatch({ visible: false })
                    dispatchVisibleBarter({ isVisible: false })
                }
            } else {
                if (response?.error) {
                    on(
                        `Обмен с ${dataProfile?.fullName} не может произойти. У нас какая-то ошибка создания. Мы работаем над исправлением`,
                        "error",
                    )
                }
            }
        })
    }

    if (isMobile) {
        return (
            <form
                className={cx(
                    styles.wrapperContainerMobile,
                    isVisible && styles.visible,
                )}
                onSubmit={handleSubmit(onSubmit)}
            >
                <header>
                    <div
                        className={styles.buttonBack}
                        onClick={() => {
                            dispatch({ visible: false })
                            dispatchVisibleBarter({ isVisible: false })
                        }}
                    >
                        <Image
                            src="/svg/chevron-left.svg"
                            alt="chevron-left"
                            width={24}
                            height={24}
                        />
                    </div>
                    <p>Послать запрос</p>
                    <div className={styles.end} />
                </header>
                <ul>
                    <div className={styles.badgeInfoProfile}>
                        <p>Обмен с:</p>
                        <div className={styles.infoProfile}>
                            <div className={styles.avatar}>
                                {dataProfile?.photo ? (
                                    <NextImageMotion
                                        src={dataProfile?.photo}
                                        alt="avatar"
                                        height={400}
                                        width={400}
                                        className={styles.photo}
                                    />
                                ) : (
                                    <ImageStatic
                                        src="/png/default_avatar.png"
                                        alt="avatar"
                                        height={400}
                                        width={400}
                                        classNames={[styles.photo]}
                                    />
                                )}
                                <Image
                                    src="/svg/verified-tick.svg"
                                    alt="verified-tick"
                                    height={16}
                                    width={16}
                                    className={styles.verified}
                                />
                            </div>
                            <div className={styles.nameGeo}>
                                <h3>{dataProfile?.fullName}</h3>
                                <GeoTagging
                                    location={address}
                                    fontSize={12}
                                    size={14}
                                />
                            </div>
                        </div>
                    </div>
                </ul>
                <Content
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    address={address}
                    errors={errors}
                />
                <Glasses />
            </form>
        )
    }

    return (
        <div
            className={cx("wrapper-fixed", styles.wrapperContainer)}
            data-visible={isVisible}
        >
            <form
                className={styles.contentModal}
                onSubmit={handleSubmit(onSubmit)}
            >
                <ButtonClose
                    onClick={() => dispatchVisibleBarter({ isVisible: false })}
                    position={{ top: 12, right: 12 }}
                />
                <Header />
                <Content
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    address={address}
                    errors={errors}
                />
                <Glasses />
            </form>
        </div>
    )
}
