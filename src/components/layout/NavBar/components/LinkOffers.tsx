import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { useAuth } from "@/store"
import { getBarterUserIdReceiver } from "@/services"
import { MENU_ICONS } from "../constants/menu-icons"

const TITLE = "Предложения обменов"

export const LinkOffers = ({ pathname }: { pathname: string }) => {
  const { id } = useAuth(({ auth }) => auth) ?? {}
  const { data } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(id!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: id, status: EnumStatusBarter.INITIATED }],
    refetchOnReconnect: true,
    refetchOnMount: true,
    enabled: !!id,
  })

  return (
    <Link
      key="::offers::link::"
      data-active={pathname?.includes("/offers")}
      href="/offers"
      prefetch
      title={TITLE}
      aria-label={TITLE}
      aria-labelledby={TITLE}
    >
      {MENU_ICONS.offers}
      <span>{TITLE}</span>
      {data?.data?.length ? (
        <div data-count>
          <span>{data?.data?.length > 9 ? "9+" : data?.data?.length || 0}</span>
        </div>
      ) : null}
    </Link>
  )
}
