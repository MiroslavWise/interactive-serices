import { ImageCategory } from "@/components/common"

import { useReciprocalExchange } from "@/store"

import styles from "../styles/offer.module.scss"

export const ItemOffer = () => {
  const offer = useReciprocalExchange(({ offer }) => offer)

  return (
    <div className={styles.container}>
      <div data-category-offer>
        <div data-img>
          <ImageCategory id={offer?.categoryId!} />
        </div>
        <span>{offer?.category?.title}</span>
      </div>
      <p>{offer?.title}</p>
    </div>
  )
}
