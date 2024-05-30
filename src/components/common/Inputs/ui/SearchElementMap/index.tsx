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

export const SearchElementMap: TSearchElementMap = ({ handleAddressLocation }) => {
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
    <div className={styles.container} id="searchElementMap" ref={ref}>
      <div data-icon>
        <IconMarkerPin />
      </div>
      <input
        type="text"
        onFocus={onFocus}
        placeholder="Выберите местоположение"
        className={styles.input}
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
      <section data-active={activeIsList} data-test="section-search-element-map">
        {values?.length > 0 ? (
          <ul data-test="section-ul-search-element-map">
            {values?.map((item) => (
              <a
                key={`::key::map::address::${item?.GeoObject?.uri}::`}
                onClick={(event) => {
                  event.stopPropagation()
                  handleAddress(item)
                }}
              >
                <span>{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
              </a>
            ))}
          </ul>
        ) : !loading && text?.length > 0 ? (
          <article>
            <h3>Адрес</h3>
            <p>По вашему запросу нет подходящих адресов</p>
          </article>
        ) : null}
      </section>
    </div>
  )
}
