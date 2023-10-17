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

import styles from "./styles/style.module.scss"
import { useToast } from "@/helpers/hooks/useToast"

export function Barter() {
    const { on } = useToast()
    const { userId } = useAuth()
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

    const { register, watch, setError, setValue, handleSubmit } =
        useForm<IValuesForm>({})

    function onSubmit(values: IValuesForm) {
        const data = {
            consignedId: dataOffer?.id!,
            provider: "barter",
            status: "initiated",
            title: dataOffer?.title!,
            enabled: true,
        } as IPostDataBarter

        if (values.date) {
            data.timestamp = dayjs(values.date).format()
        }
        if (addressId) {
            data.addresses = [Number(addressId)]
        }
        data.userId = Number(userId!)
        data.initialId = Number(values?.offerMyId!)

        console.log("data: ", data)

        serviceBarters.post(data).then((response) => {
            if (response?.ok) {
                if (response?.res?.id) {
                    on(
                        `${dataProfile?.fullName} получит ваше предлодение обмена! Подождите, пока он вам ответит`,
                    )
                    dispatchVisibleBarter({ isVisible: false })
                }
            }
        })
    }

    if (isMobile) {
        return (
            <div
                className={cx(
                    styles.wrapperContainerMobile,
                    isVisible && styles.visible,
                )}
            >
                <header>
                    <div
                        className={styles.buttonBack}
                        onClick={() =>
                            dispatchVisibleBarter({ isVisible: false })
                        }
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
                        <p>Бартер с:</p>
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
                <Glasses />
            </div>
        )
    }

    return (
        <div
            className={cx(styles.wrapperContainer, isVisible && styles.visible)}
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
                />
                <Glasses />
            </form>
        </div>
    )
}
