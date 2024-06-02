import { z } from "zod"

const EnumKindLocation = z.enum([
  "country",
  "province",
  "area",
  "locality",
  "street",
  "house",
  "route",
  "metro",
  "district",
  "main",
  "vegetation",
])
export type TKindLocation = z.infer<typeof EnumKindLocation>

export const schemaFeatureMember = z.object({
  GeoObject: z.object({
    metaDataProperty: z.object({
      GeocoderMetaData: z.object({
        precision: z.string().optional(),
        text: z.string(),
        kind: z.string().optional(),
        Address: z.object({
          country_code: z.string(),
          formatted: z.string().optional(),
          Components: z.array(
            z.object({
              kind: EnumKindLocation.or(z.string()),
              name: z.string(),
            }),
          ),
        }),
        AddressDetails: z.object({
          Country: z.object({
            AddressLine: z.string().optional(),
            CountryNameCode: z.string(),
            CountryName: z.string(),
            AdministrativeArea: z
              .object({
                AdministrativeAreaName: z.string().optional(),
                SubAdministrativeArea: z
                  .object({
                    SubAdministrativeAreaName: z.string().optional(),
                    Locality: z.object({
                      LocalityName: z.string().optional(),
                      Thoroughfare: z
                        .object({
                          ThoroughfareName: z.string().optional(),
                          Premise: z
                            .object({
                              PremiseNumber: z.string().optional(),
                            })
                            .optional(),
                        })
                        .optional(),
                    }),
                  })
                  .optional(),
              })
              .optional(),
          }),
        }),
      }),
    }),
    name: z.string().optional(),
    description: z.string().optional(),
    boundedBy: z
      .object({
        Envelope: z
          .object({
            lowerCorner: z.string().optional(),
            upperCorner: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    uri: z.string().optional(),
    Point: z.object({
      pos: z.string(),
    }),
  }),
})

export const schemaPostAddress = z.object({
  addressType: EnumKindLocation.or(z.string()),
  country: z.string().optional(),
  region: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  zip: z.number().optional(),
  street: z.string().optional(),
  house: z.string().optional(),
  block: z.string().optional(),
  apartments: z.string().optional(),
  coordinates: z.string().optional(),
  additional: z.string().optional(),
  enabled: z.boolean().optional(),
  hash: z.string().optional(),
  longitude: z.string().optional(),
  latitude: z.string().optional(),
})

export type TPostAddress = z.infer<typeof schemaPostAddress>

export type IFeatureMember = z.infer<typeof schemaFeatureMember>
export interface IResponseGeocode {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {
        GeocoderResponseMetaData: {
          request: string
          results: string
          found: string
        }
      }
      featureMember: IFeatureMember[]
    }
  }
}
