import { type IResponseOffers } from "@/services/offers/types"

import { PopupShared } from "./Popup"
import { SpriteDefault } from "@/components/icons/icon-sprite-default"

import { cx } from "@/lib/cx"
import { useOutsideClickEvent } from "@/helpers"

import styles from "../styles/shared-popup.module.scss"

export default function SharedPopupButton({ offer }: { offer: IResponseOffers }) {
  const [visible, setVisible, ref] = useOutsideClickEvent()

  return (
    <button
      type="button"
      className={cx(
        styles.container,
        "absolute top-0 right-5 bg-transparent border-none outline-none h-6 w-6 flex items-start justify-end pb-2 pl-2 z-10 text-element-grey-light hover:text-element-accent-1",
        "[&>svg]:pointer-events-none [&>svg]:w-4 [&>svg]:h-4",
      )}
      ref={ref}
      onClick={(event) => {
        event.stopPropagation()
        setVisible((prev) => !prev)
      }}
      data-active={visible}
    >
      <SpriteDefault id="dots-horizontal" />
      <PopupShared offer={offer} visible={visible} />
    </button>
  )
}
