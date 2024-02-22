import { create } from "zustand"

import type { IStateMobileChangeAbout } from "../types/typeMobileChangeAbout"

export const useMobileChangeAbout = create<IStateMobileChangeAbout>((set, get) => ({
  visible: false,
}))

export const dispatchMobileChangeAbout = (value: boolean) => useMobileChangeAbout.setState((_) => ({ visible: value }))
