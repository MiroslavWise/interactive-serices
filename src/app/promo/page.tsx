import { Manrope } from "next/font/google"

import { One, Three, Two } from "@/components/promo"

import { cx } from "@/lib/cx"

import styles from "./style.module.scss"

const manrope = Manrope({ subsets: ["latin"], style: "normal" })

export default function Promo() {
    return (
        <main className={cx(styles.wrapper, manrope.className)}>
            <div data-scroll>
                <One />
                <Two />
                <Three />
            </div>
        </main>
    )
}
