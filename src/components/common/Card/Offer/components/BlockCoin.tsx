import { ImageStatic } from "@/components/common"

import styles from "./styles/style.module.scss"

export const BlockCoin = ({ coin }: { coin?: number }) => {
    return (
        <div className={styles.containerCoin}>
            <ImageStatic src="/png/coin.png" alt="coin" width={16} height={16} />
            <p>{coin}</p>
        </div>
    )
}
