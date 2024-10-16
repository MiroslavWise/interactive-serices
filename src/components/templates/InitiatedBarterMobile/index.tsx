import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { IconChevron } from "@/components/icons/IconChevron"
import { CardBarter, LoadingBarters } from "@/components/common"

import { cx } from "@/lib/cx"
import { getBarterUserIdReceiver } from "@/services"
import { dispatchInitiatedBarter, useAuth, useInitiatedBarter } from "@/store"

export function InitiatedBarterMobile() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const visible = useInitiatedBarter(({ visible }) => visible)

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
    enabled: visible && !!userId,
  })

  const counts = data?.data?.length || 0

  return (
    <div
      className={cx(
        "wrapper-fixed",
        "w-full h-full max-h-dvh md:hidden flex flex-col bg-BG-second",
        visible ? "!z-[95] !opacity-100 !visible" : "!-z-10 opacity-0 invisible",
      )}
    >
      <header className="h-[var(--height-mobile-header)] w-full flex items-center justify-center relative px-5 py-2.5">
        <button
          onClick={(event) => {
            event.stopPropagation()
            dispatchInitiatedBarter(false)
          }}
          className={cx(
            "absolute z-[150] left-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-transparent border-none outline-none",
            "*:rotate-180 [&>svg>path]:fill-text-primary",
          )}
        >
          <IconChevron />
        </button>
        <h3 className="text-text-primary text-center text-xl font-semibold">Предложения обменов</h3>
      </header>
      <ul
        data-none-scroll
        className="w-full overflow-x-hidden overflow-y-auto flex flex-col gap-2.5 h-[calc(100%_-_var(--height-mobile-header))] px-5 pt-2.5 pb-[4.875rem]"
      >
        {counts ? <span className="text-text-primary text-base text-left font-medium">{counts} новых предложения</span> : null}
        {isLoading ? (
          [1, 2, 3].map((item) => <LoadingBarters key={`::item::load::barter::${item}::`} />)
        ) : !!counts ? (
          data?.data?.map((item) => <CardBarter key={`::key::item::barter::`} barter={item} />)
        ) : (
          <p className="text-text-primary text-base font-normal">У вас нет предложений по обмену от пользователей</p>
        )}
      </ul>
    </div>
  )
}
