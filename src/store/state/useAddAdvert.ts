import { create } from "zustand"

import { EnumTypeProvider } from "@/types/enum"

export const useAddAdvert = create<IAddAdvert>(() => ({
  type: null,
  id: null,
  userId: null,
}))

export const displayAddAdvert = (type: EnumTypeProvider, id: number, userId: number) =>
  useAddAdvert.setState((_) => ({ type: type ?? null, id: id ?? null, userId: userId ?? null }), true)
export const hideAddAdvert = () => useAddAdvert.setState((_) => ({ type: null, id: null, userId: null }), true)

interface IAddAdvert {
  type: EnumTypeProvider | null
  userId: number | null
  id: number | null
}
