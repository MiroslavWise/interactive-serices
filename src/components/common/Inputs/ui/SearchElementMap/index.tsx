"use client"

import { useState } from "react"

import type { TSearchElementMap } from "./types"
import type { IFeatureMember } from "@/services/addresses/types/geocodeSearch"

import IconMarkerPin from "@/components/icons/IconMarkerPin"

import { queryClient } from "@/context"
import { getGeocodeSearch } from "@/services"
import { dispatchMapCoordinates } from "@/store"
import { useDebounce, useOutsideClickEvent } from "@/helpers"

import styles from "./style.module.scss"
import { cx } from "@/lib/cx"

export const SearchElementMap: TSearchElementMap = () => {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeIsList, setIsActiveList, ref] = useOutsideClickEvent()
  const debouncedValue = useDebounce(onValueFunc, 300)
  const [values, setValues] = useState<IFeatureMember[]>([])

  function onFocus() {
    setIsActiveList(true)
  }

  async function onValueFunc() {
    const value = text?.trim()?.toLowerCase()?.replaceAll("  ", " ")
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
      const longitude = split[0]
      const latitude = split[1]

      const coordinates = [Number(longitude), Number(latitude)]

      setText(value?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text)
      dispatchMapCoordinates({
        coordinates: coordinates,
      })
    }
    setIsActiveList(false)
  }

  return (
    <div className={cx(styles.container, "relative flex items-center w-full h-12 rounded-3xl z-[120]")} id="searchElementMap" ref={ref}>
      <div className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 *:w-5 *:h-5">
        <IconMarkerPin />
      </div>
      <input
        type="text"
        onFocus={onFocus}
        placeholder="Выберите местоположение"
        className="h-12 w-full rounded-3xl text-text-primary outline-none border-none font-normal text-sm text-left placeholder:text-text-disabled py-3.5 pr-3.5 !pl-[2.625rem]"
        value={text}
        onChange={(event) => {
          setText(event.target.value)
          debouncedValue()
          setLoading(true)
          setIsActiveList(true)
          event.stopPropagation()
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13 || event.code === "Enter") {
            if (!loading) {
              if (values?.length > 0) {
                const item = values[0]
                handleAddress(item)
              }
            }
          }
        }}
        data-test="input-search-element-map"
      />
      <section
        data-test="section-search-element-map"
        className={cx(
          "absolute z-20 top-[calc(100%_+_0.25rem)] left-0 right-0 w-full max-h-[12.375rem] rounded-xl bg-BG-second overflow-hidden",
          activeIsList ? " opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        {values?.length > 0 ? (
          <ul data-test="section-ul-search-element-map" className="w-full h-full overflow-x-hidden overflow-y-auto flex flex-col p-1">
            {values?.map((item) => (
              <a
                key={`::key::map::address::${item?.GeoObject?.uri}::`}
                onClick={(event) => {
                  event.stopPropagation()
                  handleAddress(item)
                }}
                className="w-full p-2 pb-2.5 h-min flex items-center justify-start rounded-lg bg-transparent hover:bg-grey-field cursor-pointer"
              >
                <span className="text-text-primary text-sm font-normal">{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
              </a>
            ))}
          </ul>
        ) : !loading && text?.length > 0 ? (
          <article className="w-full h-min p-4 flex flex-col items-center gap-2 *:text-text-primary *:text-center">
            <h3 className="text-xl font-semibold">Адрес</h3>
            <p className="text-base font-normal">По вашему запросу нет подходящих адресов</p>
          </article>
        ) : null}
      </section>
    </div>
  )
}
