


export interface IAddressesResponse{
  id: number
  user_id: number
  address_type: string
  country: string
  region?: string
  district?: string
  city?: string
  zip?: number
  street?: string
  house?: string
  block?: string
  apartments?: string
  coordinates: string
  additional: string
  enabled: boolean
  created: Date
  updated: Date
}