"use client"

import { Clusterer, Map } from "@pbe/react-yandex-maps"
import { useEffect, useCallback, useRef } from "react"

import { EnumSign } from "@/types/enum"
import { type TTypeInstantsMap } from "./types"
import { type IResponseOffers } from "@/services/offers/types"

import HeaderMap from "./Header"
import ListPlacemark from "./ObjectsMap"
import ListPlacePosts from "./ObjectsMap/list-place-posts"

import { useToast } from "@/helpers/hooks/useToast"
import { getAddressCoords } from "@/helpers/get-address"
import {
  dispatchAuthModal,
  dispatchBounds,
  dispatchMapCoordinates,
  dispatchMapCoordinatesZoom,
  dispatchNewServicesBannerMap,
  EStatusAuth,
  useBounds,
  useMapCoordinates,
} from "@/store"
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

    const newStart = start.map((_) => _ - 0.04 * (10 / (zoom || 1)))
    const newEnd = end.map((_) => _ + 0.04 * (10 / (zoom || 1)))

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

  useEffect(() => {
    if (instanceRef.current) {
      return () => {
        instanceRef.current?.events.remove("dblclick", onContextMenu)
        instanceRef.current?.events.remove("actionend", actionend)
      }
    }
  }, [])

  return (
    <>
      <HeaderMap />
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
            instanceRef.current?.events.add("dblclick", onContextMenu)
            instanceRef.current?.events.add("actionend", actionend)
            instanceRef.current?.options.set({
              dblClickFloatZoom: true,
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
          minZoom: 5,
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
            const coord = event?.originalEvent?.currentTarget?._mapChildComponent?._map?._bounds as number[][]
            dispatchMapCoordinatesZoom(19)
            // let ids: IResponseOffers[] = []
            // if (event?.originalEvent?.currentTarget?._objects) {
            //   for (const item of Object.values(event?.originalEvent?.currentTarget?._objects) as any[]) {
            //     if (!!item?.cluster) {
            //       const value = item?.geoObject?.properties?._data as IResponseOffers
            //       const [geometry1, geometry2] = item?.geoObject?.geometry?._coordinates as [number, number]
            //       if (!!value) {
            //         if (
            //           (geometry1 >= coord[0][0] || geometry1 <= coord[1][0]) &&
            //           (geometry2 >= coord[0][1] || geometry2 <= coord[1][1])
            //         ) {
            //           ids.push(value)
            //         }
            //       }
            //     }
            //   }
            // }

            // dispatchHasBalloon({
            //   visibleHasBalloon: true,
            //   //@ts-ignore
            //   items: ids,
            // })
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
