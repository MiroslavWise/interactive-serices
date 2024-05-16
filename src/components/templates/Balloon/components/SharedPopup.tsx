import { IResponseOffers } from "@/services/offers/types"

import { PopupShared } from "./Popup"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { useOutsideClickEvent } from "@/helpers"

import styles from "../styles/shared-popup.module.scss"

export default function SharedPopupButton({ offer }: { offer: IResponseOffers }) {
  const [visible, setVisible, ref] = useOutsideClickEvent()

  return (
    <button
      type="button"
      className={styles.container}
      ref={ref}
      onClick={(event) => {
        event.stopPropagation()
        setVisible((prev) => !prev)
      }}
      data-active={visible}
    >
      <IconDotsHorizontal />
      <PopupShared offer={offer} visible={visible} setVisible={setVisible} />
    </button>
  )
}
