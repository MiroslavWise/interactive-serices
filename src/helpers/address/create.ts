import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import type { IFeatureMember } from "@/services/addresses/types/geocodeSearch"

import { serviceAddresses } from "@/services"
import { generateShortHash } from "@/lib/hash"
import { getLocationName } from "@/lib/location-name"

export async function createAddress(item: IFeatureMember) {
  const additional = item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
  const hash = generateShortHash(additional!)
  // const response = await serviceAddresses.getHash(hash!)
  // if (response.ok) {
  //   return response
  // }
  const coordinates = item?.GeoObject?.Point?.pos
  const longitude = item?.GeoObject?.Point?.pos?.split(" ")[0]
  const latitude = item?.GeoObject?.Point?.pos?.split(" ")[1]

  const value: IPostAddress = {
    addressType: item!?.GeoObject!?.metaDataProperty!?.GeocoderMetaData!?.kind!,
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
  if (hash) value.hash = hash

  return serviceAddresses.post(value)
}
