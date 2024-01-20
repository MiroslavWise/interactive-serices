import { type SyntheticEvent, memo } from "react"

import { IconCategory } from "@/lib/icon-set"
import { useOffersCategories, useReciprocalExchange } from "@/store"

import styles from "../styles/offer.module.scss"

export const ItemOffer = memo(function ItemOffer() {
    const offer = useReciprocalExchange(({ offer }) => offer)
    const categories = useOffersCategories(({ categories }) => categories)

    const categoryOffer = categories?.find((item) => item?.id === offer?.categoryId)

    return (
        <div className={styles.container}>
            <div data-category-offer>
                <div data-img>
                    <img
                        src={IconCategory(offer?.categoryId!)}
                        alt="category"
                        width={16}
                        height={16}
                        onError={(error: SyntheticEvent<HTMLImageElement, Event>) => {
                            if (error?.target) {
                                try {
                                    //@ts-ignore
                                    error.target.src = IconCategory(offer?.categoryId!)
                                } catch (e) {
                                    console.log("catch e: ", e)
                                }
                            }
                        }}
                    />
                </div>
                <span>{categoryOffer?.title}</span>
            </div>
            <p>{offer?.title}</p>
        </div>
    )
})
