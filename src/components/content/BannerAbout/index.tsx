"use client"

import { dispatchIntro } from "@/store/hooks"

import styles from "./styles/style.module.scss"

export const BannerAbout = () => {
    return (
        <div className={styles.container}>
            <p>Шейра - кто мы и чем можем быть полезны?</p>
            <section onClick={() => dispatchIntro(true)}>
                <p>Узнать</p>
                <img src="/svg/arrow-right.svg" alt="arrow" width={24} height={24} />
            </section>
        </div>
    )
}
