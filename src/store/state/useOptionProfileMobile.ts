import { create } from "zustand"
import { IStateOptionProfileMobile } from "../types/typeOptionProfileMobile"

export const useOptionProfileMobile = create<IStateOptionProfileMobile>((set, get) => ({
  visible: false,
}))

export const dispatchOptionProfileMobile = (value: boolean) =>
  useOptionProfileMobile.setState((_) => ({
    visible: value,
  }))
