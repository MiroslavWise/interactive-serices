import { Dispatch, memo, SetStateAction } from "react"

import { IResponseOffers } from "@/services/offers/types"

import { ButtonLike } from "./ButtonLike"
import { ButtonActivity } from "./ButtonActivity"
import { ButtonComments } from "./ButtonComments"

import styles from "../styles/block-action.module.scss"

interface IProps {
  offer: IResponseOffers

  setExpandComment: Dispatch<SetStateAction<boolean>>
}

function BlockAction({ offer, setExpandComment }: IProps) {
  return (
    <div className={styles.container}>
      <ButtonLike offer={offer} />
      <ButtonComments id={offer.id} setExpandComment={setExpandComment} />
      <ButtonActivity offer={offer} />
    </div>
  )
}

BlockAction.displayName = "BlockAction"
export default memo(BlockAction)
