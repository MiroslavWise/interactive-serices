import { type SyntheticEvent, memo } from "react"

import { useOffersCategories, useReciprocalExchange } from "@/store/hooks"

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
                        src={`/svg/category/${offer?.categoryId}.svg`}
                        alt="category"
                        width={16}
                        height={16}
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
                    />
                </div>
                <span>{categoryOffer?.title}</span>
            </div>
            <p>{offer?.title}</p>
        </div>
    )
})
