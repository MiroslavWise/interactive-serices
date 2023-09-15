import type { TContainerReviews } from "./types"

import { MotionUL } from "@/components/common/Motion"
import { CardReview } from "@/components/common/Card/Review"

import { MOCKS_REVIEW_VALUES } from "@/mocks/components/auth/constants"

import styles from "./styles/style.module.scss"

export const ContainerReviews: TContainerReviews = ({}) => {
    return (
        <MotionUL classNames={[styles.containerReviews]}>
            {MOCKS_REVIEW_VALUES.map((item, index) => (
                <CardReview
                    key={`${item?.user}_${index}`}
                    user={item?.user}
                    date={item?.date}
                    rate={item?.rate}
                    description={item?.description}
                    images={item?.images}
                />
            ))}
        </MotionUL>
    )
}
