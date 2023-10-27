import { type FC } from "react"
import Image from "next/image"

import styles from "../styles/style.module.scss"

export const BannerCoins: FC = () => {
    return (
        <div className={styles.banner}>
            <p className={styles.description}>
                Зарегистрируйтесь сейчас и получите до 5000 Шейра-коинов
            </p>
            <Image
                src="/svg/coins-banner.svg"
                alt="coins"
                width={238.715}
                height={156}
                className={styles.coins}
            />
            <div className={styles.ellipseOne} />
            <div className={styles.ellipseTwo} />
            <div className={styles.ellipseBlue} />
        </div>
    )
}
