"use client"

import { MouseEvent, useCallback, useState } from "react"

import { IconPlus } from "@/components/icons/IconPlus"
import { IconMinus } from "@/components/icons/IconMinus"
import { IconNavigate } from "@/components/icons/IconNavigate"

import { useAddress } from "@/helpers"
import { dispatchMapCoordinates, dispatchMapCoordinatesZoom, useMapCoordinates, useVisibleMobileAbout } from "@/store"

import styles from "./style.module.scss"

export default function Navigation() {
  const { coordinatesAddresses } = useAddress()
  const visible = useVisibleMobileAbout(({ visible }) => visible)

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
          coordinates: coordinatesAddresses?.[0]!,
        })
      }
      console.error("%c Вы не дали доступ к геолокации", "color: #f00")
    }
  }, [coordinatesAddresses])

  return (
    <div className={styles.container} data-transform={visible}>
      <section>
        <button onClick={(event) => handleZoom(event, "+")} disabled={zoom >= 20} data-plus>
          <div data-icon>
            <IconPlus />
          </div>
        </button>
        <button onClick={(event) => handleZoom(event, "-")} disabled={zoom <= 10} data-minus>
          <div data-icon>
            <IconMinus />
          </div>
        </button>
      </section>
      <button
        onClick={(event) => {
          event.stopPropagation()
          handleAddressLocation()
        }}
      >
        <IconNavigate />
      </button>
    </div>
  )
}
