import Image from "next/image"
import { memo } from "react"

import type { TBlockBarter } from "./types/types"

import { BadgeServices } from "@/components/common/Badge"

import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./styles/style.module.scss"

const $BlockBarter: TBlockBarter = ({ initiator, consigner }) => {
    const { categories } = useOffersCategories()

    return (
        <section className={styles.contentBarter}>
            <BadgeServices {...initiator!} isClickable />
            <Image
                src="/icons/mobile/regular/sharing-regular.svg"
                alt="barter"
                width={24}
                height={24}
            />
            <BadgeServices {...consigner!} isClickable />
        </section>
    )
}

export const BlockBarter = memo($BlockBarter)
