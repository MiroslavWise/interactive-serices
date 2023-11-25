import Image from "next/image"

import styles from "./styles/style.module.scss"

export const BadgeCoinsPlus = ({}) => {
    return (
        <div className={styles.containerBadgeCoinsPlus}>
            <p>За этот обмен вы получите</p>
            <div className={styles.containerCoins}>
                <Image
                    src="/svg/coin.svg"
                    alt="coins"
                    height={16}
                    width={16}
                    unoptimized
                />
                <p>+350</p>
            </div>
        </div>
    )
}
