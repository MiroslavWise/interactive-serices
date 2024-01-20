import { ImageStatic } from "@/components/common"

import styles from "../styles/screen.module.scss"

export function ScreenFive() {
    return (
        <div className={styles.five}>
            <ImageStatic src="/intro/5/illustration.svg" alt="illustration" width={390} height={220} />
        </div>
    )
}
