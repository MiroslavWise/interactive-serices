import { EnumProviderThreads } from "@/types/enum"

import type { ISegmentValues } from "@/components/common/Segments/types"

export const SEGMENTS_CHAT: (ISegmentValues<EnumProviderThreads> & { img: string })[] = [
  {
    label: "Личные",
    value: EnumProviderThreads.PERSONAL,
    img: "/svg/users-03.svg",
  },
  {
    label: "Обмен",
    value: EnumProviderThreads.BARTER,
    img: "/svg/repeat-white.svg",
  },
]
