"use client"

import { memo } from "react"
import { motion } from "framer-motion"

import { ButtonFill } from "@/components/common/Buttons"
import { GlassesBanner } from "@/components/common/Glasses"
import { AchievementsCount } from "@/components/profile/AchievementsCount"
import { FooterAsideLeft } from "@/components/profile/LeftAsideProfile/components/Footer"
import { HeaderBlock } from "@/components/profile/BlockProfileAside/components/HeaderBlock"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/banner.module.scss"

export const BannerIsAuth = memo(function $BannerIsAuth() {
    const { handlePush } = usePush()

    return (
        <motion.ul
            className={styles.containerAuthBanner}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: 1, visibility: "visible" }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, visibility: "hidden" }}
        >
            <section data-content>
                <HeaderBlock />
                <AchievementsCount />
                <ButtonFill
                    label="Профиль"
                    handleClick={() => {
                        handlePush(`/profile`)
                    }}
                />
            </section>
            <FooterAsideLeft />
            <GlassesBanner />
        </motion.ul>
    )
})
