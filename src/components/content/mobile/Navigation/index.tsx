"use client"

import { IconNavigate } from "@/components/icons/IconNavigate"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { handleAddressLocation } from "@/helpers/functions/navigator-address-location"
import { useVisibleMobileAbout } from "@/store"

import styles from "./style.module.scss"

export default function Navigation() {
  const visible = useVisibleMobileAbout(({ visible }) => visible)
  const { on } = useToast()

  // function handleZoom(event: MouseEvent<HTMLButtonElement>, type: "-" | "+") {
  //   event.stopPropagation()
  //   if (type === "+") {
  //     if (zoom >= 20) {
  //     } else {
  //       dispatchMapCoordinatesZoom(zoom + 1)
  //     }
  //   }
  //   if (type === "-") {
  //     if (zoom <= 10) {
  //     } else {
  //       dispatchMapCoordinatesZoom(zoom - 1)
  //     }
  //   }
  // }

  return (
    <div
      className={cx(
        styles.container,
        "fixed z-[15] right-5 bottom-[calc(var(--height-mobile-footer-nav)_+_7.5rem)] flex flex-col gap-[5.75rem] w-12 translate-y-0",
      )}
      data-transform={visible}
    >
      {/* <section className="w-full flex flex-col rounded-.625 bg-BG-second overflow-hidden">
        <button
          onClick={(event) => handleZoom(event, "+")}
          disabled={zoom >= 20}
          data-plus
          className="w-full bg-transparent p-3.5 flex flex-col items-center justify-center pb-3 disabled:bg-btn-second-default disabled:cursor-no-drop hover:opacity-90"
        >
          <div className="relative w-5 h-5 p-0.5 flex items-center justify-center *:w-4 *:h-4">
            <IconPlus />
          </div>
        </button>
        <button
          onClick={(event) => handleZoom(event, "-")}
          disabled={zoom <= 10}
          data-minus
          className="w-full bg-transparent p-3.5 flex flex-col items-center justify-center pt-3 disabled:bg-btn-second-default disabled:cursor-no-drop hover:opacity-90"
        >
          <div className="relative w-5 h-5 p-0.5 flex items-center justify-center *:w-4 *:h-4">
            <IconMinus />
          </div>
        </button>
      </section> */}
      <button
        onClick={(event) => {
          event.stopPropagation()
          handleAddressLocation(on)
        }}
        className="aspect-square w-12 h-12 flex items-center justify-center p-3.5 bg-BG-second *:w-5 *:h-5"
      >
        <IconNavigate />
      </button>
    </div>
  )
}
