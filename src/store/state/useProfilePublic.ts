import { create } from "zustand"
import { TActionDispatch, TUseProfilePublic } from "../types/createProfilePublic"

export const useProfilePublic = create<TUseProfilePublic>((set, get) => ({
  visibleProfilePublic: false,
}))

export const dispatchProfilePublic: TActionDispatch = (values) =>
  useProfilePublic.setState((_) => ({
    visibleProfilePublic: values.visible,
    idUser: values.idUser,
  }))
