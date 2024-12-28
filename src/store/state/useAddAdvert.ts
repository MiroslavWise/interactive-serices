import { EnumTypeProvider } from "@/types/enum"
import { create } from "zustand"

export const useAddAdvert = create<IAddAdvert>(() => ({
  type: null,
  id: null,
}))

export const displayAddAdvert = (type: EnumTypeProvider, id: number) =>
  useAddAdvert.setState((_) => ({ type: type ?? null, id: id ?? null }), true)
export const hideAddAdvert = () => useAddAdvert.setState((_) => ({ type: null, id: null }), false)

interface IAddAdvert {
  type: EnumTypeProvider | null
  id: number | null
}
