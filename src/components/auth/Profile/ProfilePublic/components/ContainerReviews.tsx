import type { TContainerReviews } from "./types"
import { CardReview } from "@/components/common/CardReview"
import { MOCKS_REVIEW_VALUES } from "@/mocks/components/auth/constants"
import styles from "./style.module.scss"

export const ContainerReviews: TContainerReviews = ({ }) => {

  return (
    <ul className={styles.containerReviews}>
      {
        MOCKS_REVIEW_VALUES.map((item, index) => (
          <CardReview
            key={`${item?.user}_${index}`}
            user={item?.user}
            date={item?.date}
            rate={item?.rate}
            description={item?.description}
            images={item?.images}
          />
        ))
      }
    </ul>
  )
}