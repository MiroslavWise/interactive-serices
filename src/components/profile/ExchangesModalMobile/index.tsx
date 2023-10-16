"use client"

import Image from "next/image"
import { isMobile } from "react-device-detect"

import { MotionUL } from "@/components/common/Motion"
import { CardOffer } from "@/components/common/Card/Offer"
import { Glasses } from "@/components/common/Glasses"

import { cx } from "@/lib/cx"
import { useAuth, useVisibleExchanges } from "@/store/hooks"

import styles from "./style.module.scss"
import { useQueries } from "react-query"
import { serviceBarters } from "@/services/barters/service"

export const ExchangesModalMobile = () => {
    const { isAuth } = useAuth() ?? {}
    const { type, isVisible, setVisibleType } = useVisibleExchanges() ?? {}

    // const [] = useQueries([
    // {

    // }
    // ])

    return isMobile && isAuth ? (
        <div className={cx(styles.wrapper, isVisible && styles.active)}>
            <header>
                <div
                    className={styles.buttonBack}
                    onClick={() => {
                        setVisibleType({ visible: false })
                    }}
                >
                    <Image
                        src="/svg/chevron-left.svg"
                        alt="arrow-left"
                        width={24}
                        height={24}
                    />
                </div>
                <h4>
                    {type === "current"
                        ? "Текущие"
                        : type === "completed"
                        ? "Завершённые"
                        : ""}
                </h4>
            </header>
            {/* {type === "current" ? (
                <MotionUL>
                    {HISTORY_OFFERS_MOCKS.map((item) => (
                        <CardOffer key={item.name + type} {...item} />
                    ))}
                </MotionUL>
            ) : null}
            {type === "completed" ? (
                <MotionUL>
                    {HISTORY_OFFERS_MOCKS.map((item) => (
                        <CardOffer key={item.name + type} {...item} />
                    ))}
                </MotionUL>
            ) : null} */}
            <Glasses />
        </div>
    ) : null
}
