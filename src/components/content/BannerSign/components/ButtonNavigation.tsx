import { MouseEvent, memo, useCallback } from "react"

import IconPlus from "@/components/icons/IconPlus"
import { IconMinus } from "@/components/icons/IconMinus"
import { IconNavigate } from "@/components/icons/IconNavigate"

import { cx } from "@/lib/cx"
import { useAddress } from "@/helpers"
import { dispatchMapCoordinates, dispatchMapCoordinatesZoom, useCollapsePersonalScreen, useMapCoordinates } from "@/store"

import styles from "../styles/button-collapse.module.scss"

export const ButtonNavigation = memo(() => {
  const visible = useCollapsePersonalScreen(({ visible }) => visible)
  const zoom = useMapCoordinates(({ zoom }) => zoom) //10 20
  const { coordinatesAddresses } = useAddress()

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

  const handleAddressLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          let latitude = position?.coords?.latitude
          let longitude = position?.coords?.longitude

          if (latitude && longitude) {
            dispatchMapCoordinates({
              coordinates: [longitude, latitude],
            })
          }
        },
        (error) => {
          console.log("%c error location: ", "color: #f00", error)
        },
      )
    } else {
      if (!!coordinatesAddresses && coordinatesAddresses?.length) {
        dispatchMapCoordinates({
          coordinates: coordinatesAddresses[0]!,
        })
      }
      console.error("%c Вы не дали доступ к геолокации", "color: #f00")
    }
  }, [coordinatesAddresses])

  return (
    <div className={cx(styles.buttonNavigation, "fixed left-0 bottom-6 flex flex-col gap-2.5 z-[60] w-10")} data-collapse={visible}>
      <section
        className={cx(
          "w-10 flex flex-col rounded-[0.625rem] bg-BG-second overflow-hidden",
          "*:w-full *:border-none *:outline-none *:bg-transparent *:px-2.5 *:pt-2 *:pb-2.5 hover:*:opacity-90",
        )}
      >
        <button onClick={(event) => handleZoom(event, "+")} disabled={zoom >= 20}>
          <div className="w-5 h-5 p-0.5 flex items-center justify-center *:w-4 *:h-4">
            <IconPlus />
          </div>
        </button>
        <button onClick={(event) => handleZoom(event, "-")} disabled={zoom <= 10}>
          <div className="w-5 h-5 p-0.5 flex items-center justify-center *:w-4 *:h-4">
            <IconMinus />
          </div>
        </button>
      </section>
      <button
        className="w-full aspect-square h-auto rounded-[0.625rem] bg-BG-second border-none outline-none flex items-center justify-center p-2.5"
        data-navigate
        onClick={(event) => {
          event.stopPropagation()
          handleAddressLocation()
        }}
      >
        <IconNavigate />
      </button>
    </div>
  )
})
