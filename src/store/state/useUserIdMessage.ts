import { create } from "zustand"

import { IUserOffer } from "@/services/offers/types"

export const useUserIdMessage = create<{ userData?: IUserOffer }>(() => ({}))

export const dispatchDataUser = (value?: IUserOffer) =>
  useUserIdMessage.setState((_) => ({
    userData: value,
  }))
