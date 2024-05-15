import { IResponseOffers } from "@/services/offers/types"

import { ItemProfile } from "./ItemProfile"

interface IProps {
  offer: IResponseOffers
}

export function ProfileComponent({ offer }: IProps) {
  return <ItemProfile offer={offer as unknown as IResponseOffers} />
}
