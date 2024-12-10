import { IPosts } from "../posts/types"
import { IResponse } from "../request/types"
import { IUserResponse } from "../users/types"
import { IResponseOffers } from "../offers/types"
import { IResponseOffersCategories } from "../offers-categories/types"
import { IAddressesResponse } from "../addresses/types/serviceAddresses"

interface IGetSearchData {
  addresses: IAddressesResponse[]
  categories: IResponseOffersCategories[]
  comments: []
  interests: []
  offers: IResponseOffers[]
  "offers-categories": IResponseOffersCategories[]
  posts: IPosts[]
  tags: []
  users: IUserResponse[]
}

interface IQuerySearch {
  query: string
}

export type TGetSearch = (values: { query: IQuerySearch }) => Promise<IResponse<IGetSearchData>>
