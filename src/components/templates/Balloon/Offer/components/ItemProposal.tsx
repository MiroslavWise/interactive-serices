import { memo, useMemo } from "react"

import { daysAgo } from "@/helpers"
import { ItemImages } from "./ItemImages"
import { ImageCategory } from "@/components/common"

import { useBalloonOffer, useOffersCategories } from "@/store"

import styles from "../styles/proposal.module.scss"

export const ItemProposal = memo(function ItemProposal() {
  const offer = useBalloonOffer(({ offer }) => offer)
  const categories = useOffersCategories(({ categories }) => categories)

  const proposal = offer?.title
  const time = offer?.updated
  const images = offer?.images || []

  const categoriesOffer = useMemo(() => {
    return categories?.filter((item) => offer?.categories?.some((_) => item.id === _)) || []
  }, [categories, offer?.categories])

  return (
    <article className={styles.container}>
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
                  <ImageCategory id={item.id!} />
                </div>
                <span>{item.title || ""}</span>
              </a>
            ))}
          </div>
        </>
      ) : null}
    </article>
  )
})
