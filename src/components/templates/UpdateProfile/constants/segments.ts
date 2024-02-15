import type { ISegmentValues } from "@/components/common/Segments/types"

type TTypeDataUpdate = "personal-data" | "login-details"

export const SEGMENTS: ISegmentValues<TTypeDataUpdate>[] = [
  {
    label: "Личные данные",
    value: "personal-data",
  },
  {
    label: "Данные для входа",
    value: "login-details",
  },
]
