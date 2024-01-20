import { ImageStatic } from "@/components/common"

import styles from "../styles/screen.module.scss"

export function ScreenZero() {
    return (
        <div className={styles.zero}>
            {[0, 1, 2, 3, 4, 5].map((item) => (
                <div data-image key={`${item}-image-zero`}>
                    <ImageStatic src={`/intro/0/${item}.svg`} alt="zero" width={73} height={73} />
                </div>
            ))}
        </div>
    )
}
