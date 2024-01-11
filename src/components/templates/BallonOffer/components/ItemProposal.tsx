import { type SyntheticEvent, memo, useMemo } from "react"

import { daysAgo } from "@/helpers"
import { ItemImages } from "./ItemImages"
import { useBallonOffer, useOffersCategories } from "@/store/hooks"

import styles from "../styles/proposal.module.scss"

export const ItemProposal = memo(function ItemProposal() {
    const offer = useBallonOffer(({ offer }) => offer)
    const categories = useOffersCategories(({ categories }) => categories)

    const proposal = offer?.title
    const time = offer?.updated
    const images = offer?.images || []

    const categoriesOffer = useMemo(() => {
        return categories?.filter((item) => offer?.categories?.some((_) => item.id === _)) || []
    }, [categories, offer?.categories])

    return (
        <div className={styles.container}>
            <time>{daysAgo(time!)}</time>
            <h4>Предложение</h4>
            <p data-proposal>{proposal}</p>
            {images?.length > 0 ? <ItemImages images={images} /> : null}
            {categoriesOffer?.length > 0 ? (
                <>
                    <div data-repeat>
                        <img src="/svg/repeat-gray.svg" alt="repeat" width={24} height={24} />
                    </div>
                    <h4>В обмен</h4>
                    <div data-wants>
                        {categoriesOffer.map((item) => (
                            <a key={`::${item.id}::wants::`}>
                                <div data-img>
                                    <img
                                        src={`/svg/category/${item.id}.svg`}
                                        alt="cat"
                                        onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                                            if (error?.target) {
                                                try {
                                                    //@ts-ignore
                                                    error.target.src = `/svg/category/default.svg`
                                                } catch (e) {
                                                    console.log("catch e: ", e)
                                                }
                                            }
                                        }}
                                        height={16}
                                        width={16}
                                    />
                                </div>
                                <span>{item.title || ""}</span>
                            </a>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    )
})
