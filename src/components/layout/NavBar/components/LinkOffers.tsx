import { memo } from "react"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import LinkProgress from "@/components/common/LinkProgress"

import { useAuth } from "@/store"
import { getBarterUserIdReceiver } from "@/services"
import { MENU_ICONS } from "../constants/menu-icons"

export const LinkOffers = memo(function LinkOffers() {
  const pathname = usePathname()
  const userId = useAuth(({ userId }) => userId)
  const { data } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
    refetchOnReconnect: true,
    refetchOnMount: true,
  })

  return (
    <LinkProgress key="::offers::link::" data-active={pathname?.includes("/offers")} href="/offers">
      {MENU_ICONS.offers}
      <span>Предложения обменов</span>
      {data?.res?.length ? (
        <div data-count>
          <span>{data?.res?.length > 9 ? "9+" : data?.res?.length || 0}</span>
        </div>
      ) : null}
    </LinkProgress>
  )
})
