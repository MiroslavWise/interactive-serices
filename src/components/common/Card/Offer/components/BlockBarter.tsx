import Image from "next/image"
import { memo, useMemo } from "react"

import type { TBlockBarter } from "./types/types"

import { BadgeServices } from "@/components/common/Badge"

import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./styles/style.module.scss"

const $BlockBarter: TBlockBarter = ({ initiator, consigner }) => {
    const { categories } = useOffersCategories()

    const name = useMemo(() => {
        return {
            initiator:
                categories.find((item) => item.id == initiator.categoryId)
                    ?.title || " ",
            consigner:
                categories.find((item) => item.id == consigner.categoryId)
                    ?.title || " ",
        }
    }, [initiator.categoryId, consigner.categoryId, categories])

    return (
        <section className={styles.contentBarter}>
            <BadgeServices
                photo="/mocks/Nail.png"
                label={name.initiator!}
                type={initiator?.provider}
            />
            <Image
                src="/icons/mobile/regular/sharing-regular.svg"
                alt="barter"
                width={24}
                height={24}
            />
            <BadgeServices
                photo="/mocks/hair.png"
                label={name.consigner!}
                type={consigner?.provider}
            />
        </section>
    )
}

export const BlockBarter = memo($BlockBarter)
