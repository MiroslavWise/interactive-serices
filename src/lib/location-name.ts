import type { IFeatureMember, TKindLocation } from "@/services/addresses/types/geocodeSearch"

export const getLocationName = (item: IFeatureMember, value: TKindLocation): string | undefined =>
  item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.find((item) => item?.kind === value)?.name
