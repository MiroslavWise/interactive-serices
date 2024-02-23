import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { IFeatureMember, IResponseGeocode } from "@/services/addresses/types/geocodeSearch"

import { generateShortHash } from "@/lib/hash"
import { getLocationName } from "@/lib/location-name"
import { useAuth } from "@/store"
import { getGeocodeSearch, getUserId, serviceAddresses } from "@/services"
import { useDebounce, useOutsideClickEvent } from "@/helpers"
import { queryClient } from "@/context"

export const FieldAddress = () => {
  const userId = useAuth(({ userId }) => userId)
  const [text, setText] = useState("")
  const [loadingAddress, setLoadingAddress] = useState(false)
  const [activeList, setActiveList, ref] = useOutsideClickEvent()
  const [values, setValues] = useState<IResponseGeocode | null>(null)
  const debouncedValue = useDebounce(onValueFunc, 1500)

  const { data, refetch } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId!,
    refetchOnMount: true,
    refetchOnReconnect: true,
  })

  const address = useMemo(() => {
    if (data?.res && data?.res?.addresses?.length > 0) {
      return data?.res?.addresses?.filter((item) => item?.addressType === "main")
    }
    return []
  }, [data?.res?.addresses])

  useEffect(() => {
    if (address?.length > 0) {
      const textAddress = address?.[0]?.additional
      setText(textAddress)
    }
  }, [address])

  const exactAddresses = useMemo(() => {
    if (!values) {
      return null
    }
    return (
      values?.response?.GeoObjectCollection?.featureMember?.filter((item) =>
        item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.some((_) => _?.kind === "country"),
      ) || null
    )
  }, [values])

  async function onValueFunc() {
    if (text?.length > 2) {
      const slug = text?.replaceAll(" ", "-")
      const response = await queryClient.fetchQuery({
        queryFn: () => getGeocodeSearch(text),
        queryKey: ["addresses", { string: slug }],
      })
      setValues(response)
      setLoadingAddress(false)
    } else {
      setLoadingAddress(false)
    }
  }

  async function handleAddress(item: IFeatureMember) {
    const coordinates = item?.GeoObject?.Point?.pos
    const longitude = item?.GeoObject?.Point?.pos?.split(" ")[0]
    const latitude = item?.GeoObject?.Point?.pos?.split(" ")[1]
    const additional = item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
    const value: IPostAddress = {
      addressType: "main",
      enabled: true,
    }
    const country = getLocationName(item, "country")
    const street = getLocationName(item, "street")
    const house = getLocationName(item, "house")
    const city = getLocationName(item, "locality")
    const region = getLocationName(item, "province")
    const district = getLocationName(item, "area")
    if (longitude) value.longitude = longitude
    if (latitude) value.latitude = latitude
    if (country) value.country = country
    if (street) value.street = street
    if (house) value.house = house
    if (city) value.city = city
    if (region) value.region = region
    if (district) value.district = district
    if (coordinates) value.coordinates = coordinates
    if (additional) value.additional = additional
    const hash = generateShortHash(additional!)
    if (hash) value.hash = hash
    setText(additional)

    return Promise.all(address.map((item) => serviceAddresses.patch({ enabled: false }, item?.id))).then(() => {
      serviceAddresses.post(value).then((response) => {
        console.log("response address: ", response)
        refetch()
      })
    })
  }

  return (
    <fieldset ref={ref}>
      <label>Адрес проживания</label>
      <div data-input>
        <input
          type="text"
          placeholder="Введите ваш адрес"
          value={text}
          onChange={(event) => {
            event.stopPropagation()
            setLoadingAddress(true)
            setText(event.target.value || "")
            debouncedValue()
          }}
          onFocus={(event) => {
            event.stopPropagation()
            setActiveList(true)
          }}
        />
        {loadingAddress ? (
          <div data-load>
            <img src="/svg/spinner.svg" alt="load" width={16} height={16} />
          </div>
        ) : null}
        {exactAddresses && Array.isArray(exactAddresses) && activeList ? (
          <div data-ul>
            <ul>
              {exactAddresses?.map((item) => (
                <li
                  key={`::item::address::response::${item?.GeoObject?.uri}::`}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleAddress(item)
                    setActiveList(false)
                  }}
                >
                  <span>{item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </fieldset>
  )
}
