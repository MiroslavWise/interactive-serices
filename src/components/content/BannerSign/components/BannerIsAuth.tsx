"use client"

import { Button } from "@/components/common"
import { GlassesBanner } from "@/components/common/Glasses"
import { AchievementsCount } from "@/components/profile/AchievementsCount"
import { FooterAsideLeft } from "@/components/profile/LeftAsideProfile/components/Footer"
import { HeaderBlock } from "@/components/profile/BlockProfileAside/components/HeaderBlock"

import { usePush } from "@/helpers/hooks/usePush"

import styles from "../styles/banner.module.scss"

export const BannerIsAuth = () => {
    const { handlePush } = usePush()

    return (
        <div className={styles.containerAuthBanner}>
            <ul>
                <section data-content>
                    <HeaderBlock />
                    <AchievementsCount />
                    <Button label="Профиль" typeButton="fill-primary" onClick={() => handlePush(`/profile`)} />
                </section>
                <FooterAsideLeft />
                <GlassesBanner />
            </ul>
        </div>
    )
}
