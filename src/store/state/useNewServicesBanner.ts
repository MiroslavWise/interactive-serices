import { create } from "zustand"
import { dispatchModal, EModalData } from "./useModal"

import { IPostAddress } from "@/services/addresses/types/serviceAddresses"

export const dispatchNewServicesBanner = () => {
  dispatchModal(EModalData.NewServicesBanner)
}

export const useNewServicesBannerMap = create<IStateNewServicesBannerMap>(() => ({}))

export const dispatchNewServicesBannerMap = (value: IPostAddress) =>
  useNewServicesBannerMap.setState((_) => {
    dispatchModal(EModalData.NewServicesBannerMap)
    return {
      addressInit: value,
    }
  }, true)

interface IStateNewServicesBannerMap {
  addressInit?: IPostAddress
}
