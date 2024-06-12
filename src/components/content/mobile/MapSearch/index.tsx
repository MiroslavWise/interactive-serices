"use client"

import { useState } from "react"

import { IFeatureMember } from "@/services/addresses/types/geocodeSearch"

import { IconGeo } from "@/components/icons/IconGeo"
import { IconChevron } from "@/components/icons/IconChevron"

import { dispatchMapCoordinates, dispatchVisibleSearchMobile, useSearchMobile } from "@/store"

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
      <div className={styles.container} data-visible={visible}>
        <div data-icon-geo>
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
      <div className={styles.wrapper} data-visible={visible}>
        <header>
          <button
            onClick={(event) => {
              event.stopPropagation()
              dispatchVisibleSearchMobile(false)
            }}
          >
            <IconChevron />
          </button>
          <h3>Местоположение</h3>
        </header>
        <section>
          {values?.length ? (
            <ul>
              {values?.map((item) => (
                <li
                  key={`::key::map::address::${item?.GeoObject?.uri}::`}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleAddress(item)
                  }}
                >
                  <span>{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
                </li>
              ))}
            </ul>
          ) : text?.length > 0 && !loading ? (
            <article>
              <h3>Адрес</h3>
              <p>По вашему запросу нет подходящих адресов</p>
            </article>
          ) : null}
        </section>
      </div>
    </>
  )
}

MapSearch.displayName = "MapSearch"
export default MapSearch
