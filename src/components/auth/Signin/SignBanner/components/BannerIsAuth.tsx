"use client"

import { motion } from "framer-motion"

import { ButtonFill } from "@/components/common/Buttons"
import { AchievementsCount } from "@/components/profile/AchievementsCount"
import { FooterAsideLeft } from "@/components/profile/LeftAsideProfile/components/Footer"
import { HeaderBlock } from "@/components/profile/BlockProfileAside/components/HeaderBlock"

import { cx } from "@/lib/cx"
import { usePush } from "@/helpers/hooks/usePush"

import styles from "./styles/auth-banner.module.scss"

export const BannerIsAuth = () => {
    const { handlePush } = usePush()

    return (
        <motion.ul
            id="SignBanner"
            className={cx(styles.containerAuthBanner)}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, visibility: "hidden" }}
        >
            <section className={styles.contentProfile}>
                <HeaderBlock />
                <AchievementsCount />
                {/* {!profileId ? (
                    <BadgeGradient
                        coins={2450}
                        handleClick={() => setVisible(true)}
                        type="optional-2"
                        about="Заработайте 500+ монет для успешных обменов."
                    />
                ) : null} */}
                <ButtonFill
                    label="Профиль"
                    classNames={cx("w-100", styles.largeButton)}
                    handleClick={() => {
                        handlePush(`/profile`)
                    }}
                />
            </section>
            <FooterAsideLeft />
        </motion.ul>
    )
}
