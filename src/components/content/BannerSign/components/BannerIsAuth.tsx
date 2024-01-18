import { ButtonLink } from "@/components/common"
import { AchievementsCount } from "@/components/profile/AchievementsCount"
import { FooterAsideLeft } from "@/components/profile/LeftAsideProfile/components/Footer"
import { HeaderBlock } from "@/components/profile/BlockProfileAside/components/HeaderBlock"

import styles from "../styles/banner.module.scss"

export const BannerIsAuth = () => {
    return (
        <div className={styles.containerAuthBanner}>
            <ul>
                <section data-content>
                    <HeaderBlock />
                    <AchievementsCount />
                    <ButtonLink label="Профиль" typeButton="fill-primary" href={{ pathname: "/profile" }} />
                </section>
                <FooterAsideLeft />
            </ul>
        </div>
    )
}
