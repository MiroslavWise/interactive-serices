import { type MouseEvent } from "react"

import IconPlus from "@/components/icons/IconPlus"
import { IconMinus } from "@/components/icons/IconMinus"
import { IconNavigate } from "@/components/icons/IconNavigate"

import { cx } from "@/lib/cx"
import { useToast } from "@/helpers/hooks/useToast"
import { MAX_ZOOM, MIN_ZOOM } from "@/helpers/constants"
// import { useStatusAuth } from "@/helpers/use-status-auth"
import { dispatchMapCoordinatesZoom, useMapCoordinates } from "@/store"
import { handleAddressLocation } from "@/helpers/functions/navigator-address-location"

import styles from "../styles/button-collapse.module.scss"

export const ButtonNavigation = () => {
  // const statusAuth = useStatusAuth()
  // const visible = useCollapsePersonalScreen(({ visible }) => visible)
  const zoom = useMapCoordinates(({ zoom }) => zoom)
  const { on } = useToast()

  function handleZoom(event: MouseEvent<HTMLButtonElement>, type: "-" | "+") {
    event.stopPropagation()
    if (type === "+") {
      if (zoom >= MAX_ZOOM) {
      } else {
        dispatchMapCoordinatesZoom(zoom + 1)
      }
    }
    if (type === "-") {
      if (zoom <= MIN_ZOOM) {
      } else {
        dispatchMapCoordinatesZoom(zoom - 1)
      }
    }
  }

  return (
    <div className={cx(styles.buttonNavigation, "fixed left-0 bottom-6 flex flex-col gap-2.5 z-[60] w-10")} data-collapse={true}>
      <section className="w-10 flex flex-col rounded-.625 bg-BG-second overflow-hidden">
        <button
          onClick={(event) => handleZoom(event, "+")}
          disabled={zoom >= MAX_ZOOM}
          className="px-2.5 pb-2.5 h-10 flex items-center justify-center hover:opacity-90 bg-transparent outline-none border-none w-full"
        >
          <div className="relative w-5 h-5 p-0.5 flex items-center justify-center *:w-4 *:h-4">
            <IconPlus />
          </div>
        </button>
        <button
          onClick={(event) => handleZoom(event, "-")}
          disabled={zoom <= MIN_ZOOM}
          className="relative px-2.5 pt-2.5 h-10 flex items-center justify-center hover:opacity-90 bg-transparent outline-none border-none w-full"
        >
          <div className="relative w-5 h-5 p-0.5 flex items-center justify-center *:w-4 *:h-4">
            <IconMinus />
          </div>
        </button>
      </section>
      <button
        className="w-full aspect-square h-auto rounded-.625 bg-BG-second border-none outline-none flex items-center justify-center p-2.5"
        data-navigate
        onClick={(event) => {
          event.stopPropagation()
          handleAddressLocation(on)
        }}
      >
        <IconNavigate />
      </button>
    </div>
  )
}
ButtonNavigation.displayName = "ButtonNavigation"
export default ButtonNavigation
