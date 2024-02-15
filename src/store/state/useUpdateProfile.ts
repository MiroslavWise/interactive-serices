import { create } from "zustand"

import type { IStateUpdateProfile } from "../types/typeUpdateProfile"

export const useUpdateProfile = create<IStateUpdateProfile>(() => ({
  visible: false,
}))

export const dispatchUpdateProfile = (value: boolean) => useUpdateProfile.setState(() => ({ visible: value }))
