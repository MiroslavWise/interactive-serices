"use client"

import { useState } from "react"

import { IFeatureMember } from "@/services/addresses/types/geocodeSearch"

import { IconGeo } from "@/components/icons/IconGeo"
import { IconChevron } from "@/components/icons/IconChevron"

import { dispatchMapCoordinates, dispatchVisibleSearchMobile, useBanner, useSearchMobile } from "@/store"

import { cx } from "@/lib/cx"
import { useDebounce } from "@/helpers"
import { queryClient } from "@/context"
import { getGeocodeSearch } from "@/services"

import styles from "./style.module.scss"

function MapSearch() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(onValueFunc, 300)
  const [values, setValues] = useState<IFeatureMember[]>([])
  const visible = useSearchMobile(({ visible }) => visible)
  const visibleBanner = useBanner(({ visible }) => visible)

  async function onValueFunc() {
    const value = text
      ?.trim()
      ?.toLowerCase()
      ?.replaceAll(/\s{2,}/g, " ")
    const slug = value?.replaceAll(" ", "-")

    if (value.length > 2) {
      const response = await queryClient.fetchQuery({
        queryFn: () => getGeocodeSearch(value),
        queryKey: ["addresses", { string: slug }],
      })
      if (response?.response?.GeoObjectCollection?.featureMember && response?.response?.GeoObjectCollection?.featureMember?.length > 0) {
        setValues(response?.response?.GeoObjectCollection?.featureMember)
      } else {
        setValues([])
      }
      setLoading(false)
    } else {
      setValues([])
      setLoading(false)
    }
  }

  function handleAddress(value: IFeatureMember) {
    if (value) {
      const split = value?.GeoObject?.Point?.pos?.split(" ")
      const longitude = split?.[0]!
      const latitude = split?.[1]!

      const coordinates = [Number(longitude), Number(latitude)]

      setText(value?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text)
      dispatchMapCoordinates({
        coordinates: coordinates,
      })
    }
    dispatchVisibleSearchMobile(false)
  }

  return (
    <>
      <div
        className={cx(
          styles.container,
          "fixed left-5 right-5 h-12",
          visible ? "translate-y-2.5 z-[100]" : "translate-y-0 z-20",
          visibleBanner
            ? "top-[calc(var(--height-mobile-header)_+_0.925rem_+_var(--height-banner))]"
            : "top-[calc(var(--height-mobile-header)_+_0.925rem)]",
        )}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 pointer-events-none *:w-5 *:h-5">
          <IconGeo />
        </div>
        <input
          type="text"
          placeholder="Выберите местоположение"
          value={text}
          onFocus={(event) => {
            event.stopPropagation()
            dispatchVisibleSearchMobile(true)
          }}
          onChange={(event) => {
            setLoading(true)
            event.stopPropagation()
            setText(event.target.value.replace(/\s{2,}/g, " "))
            debouncedValue()
          }}
          onKeyDown={(event) => {
            if (event?.keyCode === 13 || event?.code === "Enter") {
              if (!loading) {
                if (values && values?.length > 0) {
                  const item = values?.[0]
                  handleAddress(item)
                }
              }
            }
          }}
        />
      </div>
      <div
        className={cx(
          styles.wrapper,
          "fixed inset-0 w-full bg-BG-second",
          visible ? "z-[92] opacity-100 visible" : "-z-10 opacity-0 invisible",
        )}
      >
        <header className="w-full h-[var(--height-mobile-header)] flex flex-row items-center justify-center relative py-2.5 px-5">
          <button
            onClick={(event) => {
              event.stopPropagation()
              dispatchVisibleSearchMobile(false)
            }}
            className="w-5 h-5 border-none flex items-center justify-center bg-transparent absolute top-1/2 -translate-y-1/2 left-5 z-20 *:w-5 *:h-5 *:rotate-180 [&>svg>path]:fill-text-primary"
          >
            <IconChevron />
          </button>
          <h3 className="text-text-primary text-center text-xl font-semibold">Местоположение</h3>
        </header>
        <section className="w-full px-5">
          {values?.length ? (
            <ul className="w-full overflow-x-hidden overflow-y-auto relative z-20 flex flex-col p-1 rounded-xl">
              {values?.map((item) => (
                <li
                  key={`::key::map::address::${item?.GeoObject?.uri}::`}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleAddress(item)
                  }}
                  className="w-full p-2 pb-2.5 rounded-lg bg-BG-second cursor-pointer hover:bg-grey-field focus:bg-grey-field"
                >
                  <span className="text-text-primary text-sm font-normal">{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
                </li>
              ))}
            </ul>
          ) : text?.length > 0 && !loading ? (
            <article className="w-full h-min p-4 flex flex-col items-center gap-2">
              <h3 className="text-text-primary text-center text-xl font-semibold">Адрес</h3>
              <p className="text-text-secondary text-center text-base font-normal">По вашему запросу нет подходящих адресов</p>
            </article>
          ) : null}
        </section>
      </div>
    </>
  )
}

MapSearch.displayName = "MapSearch"
export default MapSearch
