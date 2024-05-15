import { memo, useMemo } from "react"

import { IResponseOffers } from "@/services/offers/types"

import ItemImages from "./ItemImages"
import { ImageCategory } from "@/components/common"
import IconRepeat from "@/components/icons/IconRepeat"

import { useOffersCategories } from "@/store"

import styles from "../styles/proposal.module.scss"

export const ItemDescriptions = memo(function ItemProposal({ offer }: { offer: IResponseOffers }) {
  const proposal = offer?.title
  const images = offer?.images || []
  const categories = useOffersCategories(({ categories }) => categories)

  const categoriesOffer = useMemo(() => {
    return categories?.filter((item) => offer?.categories?.some((_) => item.id === _)) || []
  }, [categories, offer?.categories])

  return (
    <article className={styles.container}>
      <b>Предложение</b>
      <p data-proposal>{proposal}</p>
      {images?.length > 0 ? <ItemImages images={images} /> : null}
      {categoriesOffer?.length > 0 ? (
        <section>
          <div data-repeat>
            <IconRepeat />
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
        </section>
      ) : null}
    </article>
  )
})
