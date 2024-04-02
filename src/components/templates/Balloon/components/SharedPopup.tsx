import { IUserResponse } from "@/services/users/types"
import { IResponseOffers } from "@/services/offers/types"

import { PopupShared } from "./Popup"
import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { useOutsideClickEvent } from "@/helpers"

import styles from "../styles/shared-popup.module.scss"

export default function SharedPopupButton({ offer, user }: { offer: IResponseOffers; user: IUserResponse }) {
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
    >
      <IconDotsHorizontal />
      <PopupShared offer={offer} visible={visible} user={user} setVisible={setVisible} />
    </button>
  )
}
