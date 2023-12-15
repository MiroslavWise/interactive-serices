import { ImageStatic } from "@/components/common"

import styles from "../styles/screen.module.scss"

export function ScreenFour() {
    return (
        <div className={styles.four}>
            <div data-images>
                {[0, 1, 2, 3, 4, 5].map((item) => (
                    <ImageStatic
                        key={`${item}-avatar-img-four`}
                        data-img={item}
                        src={`/intro/4/${item}.png`}
                        alt="avatar"
                        width={70}
                        height={70}
                    />
                ))}
            </div>
        </div>
    )
}
