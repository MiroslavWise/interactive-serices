import { create } from "zustand"

import type { IStateActiveServicesFrom } from "../types/typeActiveServicesFrom"

export const useActiveServicesFrom = create<IStateActiveServicesFrom>(() => ({
  visible: false,
}))

export const dispatchActiveServicesFrom = (value: boolean) => useActiveServicesFrom.setState((_) => ({ visible: value }))
