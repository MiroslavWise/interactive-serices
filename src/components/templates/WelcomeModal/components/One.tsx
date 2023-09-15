"use client"

import { isMobile } from "react-device-detect"

import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"
import { ImageStatic } from "@/components/common/Image"

const title = "Добро пожаловать в Sheira!"
const description =
    "Теперь вы можете публиковать предложения и запросы на услуги на карте, добавлять новости и создавать SOS-сообщения. А еще получать Sheira-коины, награды за активность и общаться с теми, кто живет поблизости. Попробуйте, вам точно понравится!"

export const One = () => {
    return (
        <section className={cx(styles.contentPage, isMobile && styles.mobile)}>
            <header>
                <ImageStatic
                    src="/png/24770609_93-fococlipping-HD 1.png"
                    alt="welcome-one"
                    width={376}
                    height={214}
                />
                <div className={styles.divider} />
            </header>
            <div className={styles.titleAndDescription}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </section>
    )
}
