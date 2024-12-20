"use client"

import React, { useEffect, useCallback, useRef } from "react"
import ReactDOM from "react-dom"
import { Clusterer, Map } from "@pbe/react-yandex-maps"

import { EnumSign } from "@/types/enum"
import { type TTypeInstantsMap } from "./types"

import HeaderMap from "./Header"
import ListPlacemark from "./ObjectsMap"
import ListPlacePosts from "./ObjectsMap/list-place-posts"

import {
  useBounds,
  EStatusAuth,
  dispatchBounds,
  useMapCoordinates,
  dispatchAuthModal,
  dispatchMapCoordinates,
  dispatchMapCoordinatesZoom,
  dispatchNewServicesBannerMap,
  dispatchCollapseServicesTrue,
} from "@/store"
import { clg } from "@console"
import { useToast } from "@/helpers/hooks/useToast"
import { MAX_ZOOM, MIN_ZOOM } from "@/helpers/constants"
import { getAddressCoords } from "@/helpers/get-address"
import { useStatusAuth } from "@/helpers/use-status-auth"

const COORD = [37.427698, 55.725864]

function YandexMap() {
  const statusAuth = useStatusAuth()
  const coordinates = useMapCoordinates(({ coordinates }) => coordinates)
  const zoom = useMapCoordinates(({ zoom }) => zoom)
  const instanceRef: TTypeInstantsMap = useRef()
  const bounds = useBounds(({ bounds }) => bounds)
  const { on } = useToast()
  

  function onContextMenu(e: any) {
    console.log("onContextMenu: ", e)
    if (statusAuth !== EStatusAuth.AUTHORIZED) {
      dispatchAuthModal({ visible: true, type: EnumSign.SignIn })
      on({ message: "Вы не можете создать услугу и беседу, пока не войдёте или не зарегистрируетесь на нашем сервисе" })
      return
    }
    const mapOne: number = e?._sourceEvent?.originalEvent?.coords?.[0]
    const mapTwo: number = e?._sourceEvent?.originalEvent?.coords?.[1]

    getAddressCoords({ mapOne, mapTwo }).then((response) => {
      if (response) {
        console.log("response: ", response)
        dispatchNewServicesBannerMap(response)
      }
    })
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
            instanceRef?.current?.setCenter([longitude, latitude])
          }
        },
        (error) => {
          console.log("%c error location: ", "color: #f00", error)
        },
      )
    } else {
      dispatchMapCoordinates({
        coordinates: COORD,
      })
      if (instanceRef) {
        instanceRef?.current?.setCenter(COORD)
      }
      console.error("%c Вы не дали доступ к геолокации", "color: #f00")
    }
  }, [])

  useEffect(() => {
    if (!coordinates) {
      handleAddressLocation()
    }
  }, [coordinates, handleAddressLocation])

  function boundsExpansion(bounds: number[][] | undefined) {
    if (!bounds) return undefined

    const [start, end] = bounds

    const newStart = start.map((_) => _ - 0.02 * (10 / (zoom || 1)))
    const newEnd = end.map((_) => _ + 0.02 * (10 / (zoom || 1)))

    return [newStart, newEnd]
  }

  function actionend(events: any) {
    const bounds: number[][] | undefined = events.originalEvent?.target?._bounds
    const _zoom = (events.originalEvent?.target?._zoom as number) || zoom
    const newB = boundsExpansion(bounds)
    dispatchBounds(newB)
    if (_zoom !== zoom) {
      dispatchMapCoordinatesZoom(_zoom)
    }
  }

  function onZoom(event: any) {
    const zoom = event.originalEvent.target?._zoom as number
    dispatchMapCoordinatesZoom(zoom)
  }

  useEffect(() => {
    return () => {
      if (instanceRef.current) {
        instanceRef.current.events.remove("dblclick", onContextMenu)
        instanceRef.current.events.remove("actionend", actionend)
        instanceRef.current.events.remove("wheel", onZoom)
      }
    }
  }, [])

  return (
    <>
      <HeaderMap />
      <Map
        modules={["Placemark", "Map", "Clusterer"]}
        instanceRef={instanceRef}
        onContextMenu={onContextMenu}
        onDoubleClick={(e: any) => console.log("onDoubleClick: ", e)}
        onLoad={(event) => {
          event.ready().then(() => {
            if (!bounds?.length) {
              const bounds = instanceRef.current?.getBounds()
              const newB = boundsExpansion(bounds)

              dispatchBounds(newB)
            }
            if (instanceRef.current) {
              instanceRef.current.events.add("dblclick", onContextMenu)
              instanceRef.current.events.add("actionend", actionend)
              instanceRef.current.options.set({
                dblClickFloatZoom: true,
              })
              instanceRef.current.events.add("wheel", onZoom)
            }
          })
        }}
        state={{
          center: coordinates || COORD,
          zoom: zoom,
          behaviors: ["default"],
          type: "yandex#map",
        }}
        options={{
          maxZoom: MAX_ZOOM,
          minZoom: MIN_ZOOM,
          yandexMapDisablePoiInteractivity: true,
        }}
        width={"100%"}
        height={"100%"}
      >
        <Clusterer
          options={{
            iconLayout: "cluster#pieChart",
            iconContentLayout: "cluster#pieChart",
            hasBalloon: false,
            iconPieChartStrokeWidth: 2,
            clusterDisableClickZoom: true,
            iconPieChartCoreRadius: 8,
            data: {},
          }}
          onClick={(event: any) => {
            const source = (event?._sourceEvent?.originalEvent?.target?.geometry?._coordinates as [number, number]) ?? undefined

            dispatchMapCoordinates({
              coordinates: source,
              zoom: zoom + 3,
            })
            dispatchCollapseServicesTrue()
          }}
        >
          <ListPlacemark />
          <ListPlacePosts />
        </Clusterer>
      </Map>
    </>
  )
}

YandexMap.displayName = "YandexMap"
export default YandexMap

// async function main() {
//   const [ymaps3React] = await Promise.all([ymaps3.import("@yandex/ymaps3-reactify"), ymaps3.ready])

//   const reactify = ymaps3React.reactify.bindTo(React, ReactDOM)
//   // const { YMapClusterer, clusterByGrid } = reactify.module(await ymaps3.import("@yandex/ymaps3-clusterer"))

//   return reactify
// }
