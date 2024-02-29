import { IPostAddress } from "@/services/addresses/types/serviceAddresses"

import { generateShortHash } from "@/lib/hash"
import { getGeocodeSearchCoords } from "@/services"
import { getLocationName } from "@/lib/location-name"

export async function getAddressCoords({ mapTwo, mapOne }: { mapOne: number; mapTwo: number }) {
  const data: IPostAddress = {
    addressType: "",
    enabled: false,
  }

  const response = await getGeocodeSearchCoords(`${mapOne},${mapTwo}`)

  if (!response?.response) return null

  const elem = response?.response?.GeoObjectCollection?.featureMember[0]
  if (!elem) return null

  if (elem.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind) {
    data.addressType = elem.GeoObject?.metaDataProperty?.GeocoderMetaData?.kind!
  }
  const longitude = elem?.GeoObject?.Point?.pos?.split(" ")[0]
  const latitude = elem?.GeoObject?.Point?.pos?.split(" ")[1]
  const country = getLocationName(elem, "country")
  const street = getLocationName(elem, "street")
  const house = getLocationName(elem, "house")
  const city = getLocationName(elem, "locality")
  const region = getLocationName(elem, "province")
  const district = getLocationName(elem, "area")
  const additional = elem?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
  const coordinates = elem?.GeoObject?.Point?.pos
  if (longitude) data.longitude = longitude
  if (latitude) data.latitude = latitude
  if (country) data.country = country
  if (street) data.street = street
  if (house) data.house = house
  if (city) data.city = city
  if (region) data.region = region
  if (district) data.district = district
  if (coordinates) data.coordinates = coordinates
  if (additional) {
    data.additional = additional
  }
  const hash = generateShortHash(additional!)
  if (hash) data.hash = hash

  return data!
}
