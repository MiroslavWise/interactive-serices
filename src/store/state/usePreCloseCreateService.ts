import { create } from "zustand"

import { EnumTypeProvider } from "@/types/enum"

export const usePreCloseCreateService = create<IStateUsePreCloseCreateService>(() => ({
  visible: false,
  type: null,
}))

export const dispatchOpenPreCloseCreateService = (value: EnumTypeProvider) =>
  usePreCloseCreateService.setState((_) => ({
    type: value,
    visible: true,
  }))

export const dispatchClosePreCloseCreateService = () =>
  usePreCloseCreateService.setState(
    (_) => ({
      type: null,
      visible: false,
    }),
    true,
  )

interface IStateUsePreCloseCreateService {
  visible: boolean
  type: EnumTypeProvider | null
}
