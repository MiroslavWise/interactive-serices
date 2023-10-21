"use client"

import { type FC } from "react"
import { isMobile } from "react-device-detect"

import { HeaderBlock } from "./components/HeaderBlock"
import { AchievementsCount } from "../AchievementsCount"
import { ButtonDefault } from "@/components/common/Buttons"

import { cx } from "@/lib/cx"
import { useUpdateProfile } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const BlockProfileAside: FC = () => {
    const { setVisible } = useUpdateProfile()

    return (
        <section className={cx(styles.container, isMobile && styles.mobile)}>
            <HeaderBlock />
            {typeof isMobile !== "undefined" && !isMobile ? (
                <AchievementsCount />
            ) : null}
            <div className={styles.buttons}>
                <ButtonDefault
                    label="Редактировать профиль"
                    classNames={cx("w-100", styles.largeButton)}
                    disabled
                    handleClick={() => setVisible(true)}
                />
            </div>
        </section>
    )
}
