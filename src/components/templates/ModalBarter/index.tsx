"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

import { Header } from "./components/Header"
import { Content } from "./components/Content"
import { Glasses } from "@/components/layout/Glasses"
import { ButtonClose } from "@/components/common/Buttons"
import { GeoTagging } from "@/components/common/GeoTagging"
import { ImageStatic, NextImageMotion } from "@/components/common/Image"

import { cx } from "@/lib/cx"
import { useVisibleModalBarter } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export function Barter() {
    const { isVisible, setIsVisibleBarter, dataProfile } =
        useVisibleModalBarter()

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
                        onClick={() => setIsVisibleBarter({ isVisible: false })}
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
                                    location="Мосва, Москва-Сити"
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
            <div className={styles.contentModal}>
                <ButtonClose
                    onClick={() => setIsVisibleBarter({ isVisible: false })}
                    position={{ top: 12, right: 12 }}
                />
                <Header />
                <Content />
                <Glasses />
            </div>
        </div>
    )
}
