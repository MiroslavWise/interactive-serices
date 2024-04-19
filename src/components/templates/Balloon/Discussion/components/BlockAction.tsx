import { IResponseOffers } from "@/services/offers/types"

import { ButtonLike } from "./ButtonLike"
import { ButtonActivity } from "./ButtonActivity"
import { ButtonComments } from "./ButtonComments"

import styles from "../styles/block-action.module.scss"

interface IProps {
  offer: IResponseOffers
}

export const BlockAction = ({ offer }: IProps) => {
  return (
    <div className={styles.container}>
      <ButtonLike />
      <ButtonComments id={offer.id} />
      <ButtonActivity offer={offer} />
    </div>
  )
}
