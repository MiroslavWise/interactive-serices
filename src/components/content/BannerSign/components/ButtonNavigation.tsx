import { MouseEvent, memo } from "react"

import { IconPlus } from "@/components/icons/IconPlus"
import { IconMinus } from "@/components/icons/IconMinus"
import { IconNavigate } from "@/components/icons/IconNavigate"

import { dispatchMapCoordinatesZoom, useCollapsePersonalScreen, useMapCoordinates } from "@/store"

import styles from "../styles/button-collapse.module.scss"

export const ButtonNavigation = memo(() => {
  const visible = useCollapsePersonalScreen(({ visible }) => visible)
  const zoom = useMapCoordinates(({ zoom }) => zoom) //10 20

  function handleZoom(event: MouseEvent<HTMLButtonElement>, type: "-" | "+") {
    event.stopPropagation()
    if (type === "+") {
      if (zoom >= 20) {
      } else {
        dispatchMapCoordinatesZoom(zoom + 1)
      }
    }
    if (type === "-") {
      if (zoom <= 10) {
      } else {
        dispatchMapCoordinatesZoom(zoom - 1)
      }
    }
  }

  return (
    <div className={styles.buttonNavigation} data-collapse={visible}>
      <section>
        <button onClick={(event) => handleZoom(event, "+")} disabled={zoom >= 20}>
          <div data-icon>
            <IconPlus />
          </div>
        </button>
        <button onClick={(event) => handleZoom(event, "-")} disabled={zoom <= 10}>
          <div data-icon>
            <IconMinus />
          </div>
        </button>
      </section>
      <button data-navigate>
        <IconNavigate />
      </button>
    </div>
  )
})
