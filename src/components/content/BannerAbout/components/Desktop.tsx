import { dispatchIntro } from "@/store/hooks"

import styles from "../styles/desktop.module.scss"

export function BannerAboutDesktop() {
    return (
        <div className={styles.container} onClick={() => dispatchIntro(true)}>
            <p>Шейра - кто мы и чем можем быть полезны?</p>
            <section>
                <p>Узнать</p>
                <img src="/svg/arrow-right.svg" alt="arrow" width={24} height={24} />
            </section>
        </div>
    )
}
