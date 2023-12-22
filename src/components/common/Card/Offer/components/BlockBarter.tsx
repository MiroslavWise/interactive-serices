import Image from "next/image"

import type { TBlockBarter } from "./types/types"

import { BadgeServices } from "@/components/common/Badge"

import styles from "./styles/style.module.scss"

export const BlockBarter: TBlockBarter = ({ initiator, consigner }) => {
    return (
        <section className={styles.contentBarter}>
            <BadgeServices {...initiator!} isClickable />
            <img src="/icons/mobile/regular/sharing-regular.svg" alt="barter" width={24} height={24} />
            <BadgeServices {...consigner!} isClickable />
        </section>
    )
}
