import Image from "next/image"
import { memo, useMemo } from "react"

import type { TBlockBarter } from "./types/types"
import type { ISmallDataOfferBarter } from "@/services/barters/bartersService"

import { BadgeServices } from "@/components/common/Badge"

import { usePush } from "@/helpers"
import { useOffersCategories } from "@/store/state/useOffersCategories"

import styles from "./styles/style.module.scss"
import { useMapCoordinates } from "@/store/state/useMapCoordinates"
import { useBalloonCard } from "@/store/state/useBalloonCard"

const $BlockBarter: TBlockBarter = ({ initiator, consigner }) => {
    const { categories } = useOffersCategories()
    const { handlePush } = usePush()
    const { dispatchMapCoordinates } = useMapCoordinates()
    const { dispatch } = useBalloonCard()

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

    function handle(value: ISmallDataOfferBarter) {
        handlePush("/")
        dispatchMapCoordinates({
            coordinates: value?.addresses?.[0]?.coordinates
                ?.split(" ")
                ?.reverse()
                ?.map(Number),
            zoom: 20,
        })
        dispatch({
            visible: true,
            type: value.provider!,
            id: value?.id,
            idUser: value?.userId,
        })
    }

    return (
        <section className={styles.contentBarter}>
            <BadgeServices
                photo="/mocks/Nail.png"
                label={name.initiator!}
                type={initiator?.provider}
                onClick={() => handle(initiator!)}
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
                onClick={() => handle(consigner!)}
            />
        </section>
    )
}

export const BlockBarter = memo($BlockBarter)
