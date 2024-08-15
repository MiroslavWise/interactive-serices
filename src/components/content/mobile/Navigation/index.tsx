"use client"

import { MouseEvent, useCallback, useState } from "react"

import IconPlus from "@/components/icons/IconPlus"
import { IconMinus } from "@/components/icons/IconMinus"
import { IconNavigate } from "@/components/icons/IconNavigate"

import { cx } from "@/lib/cx"
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
    <div
      className={cx(
        styles.container,
        "fixed z-[15] right-5 bottom-[calc(var(--height-mobile-footer-nav)_+_7.5rem)] flex flex-col gap-[5.75rem] w-12 translate-y-0",
      )}
      data-transform={visible}
    >
      <section className="w-full flex flex-col rounded-[0.625rem] bg-BG-second overflow-hidden">
        <button
          onClick={(event) => handleZoom(event, "+")}
          disabled={zoom >= 20}
          data-plus
          className="w-full bg-transparent p-3.5 flex flex-col items-center justify-center pb-3 disabled:bg-btn-second-default disabled:cursor-no-drop hover:opacity-90"
        >
          <div className="w-5 h-5 p-0.5 flex items-center justify-center *:w-4 *:h-4">
            <IconPlus />
          </div>
        </button>
        <button
          onClick={(event) => handleZoom(event, "-")}
          disabled={zoom <= 10}
          data-minus
          className="w-full bg-transparent p-3.5 flex flex-col items-center justify-center pt-3 disabled:bg-btn-second-default disabled:cursor-no-drop hover:opacity-90"
        >
          <div className="w-5 h-5 p-0.5 flex items-center justify-center *:w-4 *:h-4">
            <IconMinus />
          </div>
        </button>
      </section>
      <button
        onClick={(event) => {
          event.stopPropagation()
          handleAddressLocation()
        }}
        className="aspect-square w-12 h-12 flex items-center justify-center p-3.5 bg-BG-second *:w-5 *:h-5"
      >
        <IconNavigate />
      </button>
    </div>
  )
}
