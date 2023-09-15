import {
    IFeatureMember,
    TKindLocation,
} from "@/services/addresses/types/geocodeSearch"

export const locationName = (
    item: IFeatureMember,
    value: TKindLocation,
): string | undefined => {
    return item?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.find(
        (item) => item?.kind === value,
    )?.name
}
