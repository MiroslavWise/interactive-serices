import type { TContainerReviews } from "./types"

import { MotionUL } from "@/components/common/Motion"
import { CardReview } from "@/components/common/Card/Review"


import styles from "./styles/style.module.scss"

export const ContainerReviews: TContainerReviews = ({}) => {
    return (
        <MotionUL classNames={[styles.containerReviews]}>
            <></>
        </MotionUL>
    )
}
