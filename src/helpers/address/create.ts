import { type IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { type IFeatureMember } from "@/services/addresses/types/geocodeSearch"

import { generateShortHash } from "@/lib/hash"
import { getLocationName } from "@/lib/location-name"
import { getHashAddress, postAddress } from "@/services"

async function createAddress(item: IFeatureMember, userId: number) {
  const additional = item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text
  const hash = generateShortHash(`${userId}=${additional!}`)
  const response = await getHashAddress(hash!)

  if (!!response.data) return response

  const coordinates = item?.GeoObject?.Point?.pos
  const longitude = item?.GeoObject?.Point?.pos?.split(" ")[0]
  const latitude = item?.GeoObject?.Point?.pos?.split(" ")[1]

  const data: IPostAddress = {
    addressType: item!?.GeoObject!?.metaDataProperty!?.GeocoderMetaData!?.kind!,
    enabled: true,
  }
  const country = getLocationName(item, "country")
  const street = getLocationName(item, "street")
  const house = getLocationName(item, "house")
  const city = getLocationName(item, "locality")
  const region = getLocationName(item, "province")
  const district = getLocationName(item, "area")
  if (longitude) data.longitude = longitude
  if (latitude) data.latitude = latitude
  if (country) data.country = country
  if (street) data.street = street
  if (house) data.house = house
  if (city) data.city = city
  if (region) data.region = region
  if (district) data.district = district
  if (coordinates) data.coordinates = coordinates
  if (additional) data.additional = additional
  if (hash) data.hash = hash

  return postAddress(data)
}

export { createAddress }
