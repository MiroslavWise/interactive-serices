import { create } from "zustand"

import type { IResponseOffers } from "@/services/offers/types"

export const useUpdateOffer = create<{ visible: boolean; offer?: IResponseOffers }>(() => ({ visible: false }))
export const dispatchUpdateOffer = (visible: boolean, offer?: IResponseOffers) => useUpdateOffer.setState(() => ({ visible, offer }))
