"use client"

import { Map } from "@pbe/react-yandex-maps"
import { useEffect, useCallback, useRef } from "react"

import { EnumSign } from "@/types/enum"
import type { TTypeInstantsMap, TYandexMap } from "./types"

import { Header } from "./Header"
import { ListPlacemark } from "./ObjectsMap"

import { useAddress } from "@/helpers"
import { useToast } from "@/helpers/hooks/useToast"
import { getAddressCoords } from "@/helpers/get-address"
import {
  dispatchAuthModal,
  dispatchBounds,
  dispatchMapCoordinates,
  dispatchNewServicesBannerMap,
  useAuth,
  useBounds,
  useMapCoordinates,
} from "@/store"

const COORD = [30.19, 59.57]

const YandexMap: TYandexMap = ({}) => {
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const { coordinatesAddresses } = useAddress()
  const coordinates = useMapCoordinates(({ coordinates }) => coordinates)
  const zoom = useMapCoordinates(({ zoom }) => zoom)
  const instanceRef: TTypeInstantsMap = useRef()
  const bounds = useBounds(({ bounds }) => bounds)
  const { on } = useToast()

  function onContextMenu(e: any) {
    console.log("onContextMenu: ", e)
    if (!isAuth) {
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
      if (!!coordinatesAddresses && coordinatesAddresses?.length) {
        dispatchMapCoordinates({
          coordinates: coordinatesAddresses[0]!,
        })
        if (instanceRef) {
          instanceRef?.current?.setCenter(coordinatesAddresses[0]!)
        }
      }
      console.error("%c Вы не дали доступ к геолокации", "color: #f00")
    }
  }, [coordinatesAddresses])

  useEffect(() => {
    if (!coordinates) {
      handleAddressLocation()
    }
  }, [coordinates, handleAddressLocation])

  function boundsExpansion(bounds: number[][] | undefined, zoom?: number) {
    if (!bounds) return undefined

    const [start, end] = bounds

    const newStart = start.map((_) => _ - 0.2 * (10 / (zoom || 1)))
    const newEnd = end.map((_) => _ + 0.2 * (10 / (zoom || 1)))

    return [newStart, newEnd]
  }
  return (
    <>
      <Header handleAddressLocation={handleAddressLocation} />
      <Map
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

            instanceRef.current?.events.add("dblclick", (events: any) => onContextMenu(events))

            instanceRef.current?.options.set({
              dblClickFloatZoom: true,
            })
            instanceRef.current?.events.add("actionend", (events: any) => {
              const bounds: number[][] | undefined = events.originalEvent?.target?._bounds
              const zoom = (events.originalEvent?.target?._zoom as number) || 13
              const newB = boundsExpansion(bounds, zoom)

              dispatchBounds(newB)
            })
          })
        }}
        state={{
          center: coordinates || COORD,
          zoom: zoom,
          behaviors: ["default"],
          type: "yandex#map",
        }}
        options={{
          maxZoom: 20,
          minZoom: 10,
          yandexMapDisablePoiInteractivity: true,
        }}
        width={"100%"}
        height={"100%"}
      >
        {/* <Clusterer
          options={{
            iconLayout: "cluster#pieChart",
            iconContentLayout: "cluster#pieChart",
            hasBalloon: false,
            iconPieChartStrokeWidth: 2,
            clusterDisableClickZoom: true,
            iconPieChartCoreRadius: 8,
          }}
          onClick={async (event: any) => {
            const coord = event?.originalEvent?.currentTarget?._mapChildComponent?._map?._bounds as number[][]
            let ids: { id: number; offer: IResponseOffers }[] = []
            if (event?.originalEvent?.currentTarget?._objects) {
              const maps = Object.values(event?.originalEvent?.currentTarget?._objects as object)
                .filter((value) => !!value?.cluster)
                ?.map((value) => value?.geoObject?.properties?._data)
                ?.filter(
                  (item) =>
                    (item?.item[0] >= coord[0][0] || item?.item[0] <= coord[1][0]) &&
                    (item?.item[1] >= coord[0][1] || item?.item[1] <= coord[1][1]),
                )

              for (let i = 0; i < maps.length; i++) {
                ids.push({
                  id: maps[i]?.id,
                  offer: maps[i]?.offer,
                })
              }
            }

            dispatchHasBalloon({
              visibleHasBalloon: true,
              offers: ids?.map((item) => item.offer),
            })
          }}
        > */}
        <ListPlacemark />
        {/* </Clusterer> */}
      </Map>
    </>
  )
}

YandexMap.displayName = "YandexMap"
export default YandexMap
