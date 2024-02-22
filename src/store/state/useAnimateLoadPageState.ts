import { create } from "zustand"

import type { IUseAnimateLoadPageState } from "../types/useAnimateLoadPage"

export const useAnimateLoadPage = create<IUseAnimateLoadPageState>((set, get) => ({
  isAnimated: false,
}))

export const dispatchAnimated = (value: boolean) =>
  useAnimateLoadPage.setState((_) => ({
    isAnimated: value,
  }))
