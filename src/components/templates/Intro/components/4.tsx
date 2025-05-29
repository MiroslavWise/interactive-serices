import { ImageStatic } from "@/components/common"

import styles from "../styles/screen.module.scss"

export function ScreenFour() {
    return (
        <div className={styles.four}>
            <ImageStatic src="/intro/4/4-back.png" alt="four-back" width={175} height={130} />
        </div>
    )
}
