import { useMemo } from "react"
import { useQueries, useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { NextImageMotion } from "@/components/common"
import { IconChevron } from "@/components/icons/IconChevron"

import { cx } from "@/lib/cx"
import { dispatchInitiatedBarter, useAuth } from "@/store"
import { getBarterUserIdReceiver, getUserId } from "@/services"

export const HeaderExchangeOffers = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data, isLoading } = useQuery({
    queryFn: () =>
      getBarterUserIdReceiver(userId!, {
        status: EnumStatusBarter.INITIATED,
        order: "DESC",
      }),
    queryKey: ["barters", { receiver: userId, status: EnumStatusBarter.INITIATED }],
    enabled: !!userId,
  })

  const users = new Set(data?.data?.map((item) => item?.userId) || [])

  const dataUsers = useQueries({
    queries: Array.from(users)
      .slice(0, 5)
      .map((item) => ({
        queryFn: () => getUserId(item!),
        queryKey: ["user", { userId: item }],
        enabled: !!users.size && !!item,
      })),
  })

  const images = useMemo(() => {
    if (dataUsers?.some((some) => !some?.isLoading) && !isLoading) {
      return dataUsers?.map((item) => item?.data?.data?.profile?.image?.attributes?.url!)
    }

    return []
  }, [dataUsers])

  const length = data?.data?.length || 0

  return (
    <section className="w-full p-4 rounded-2xl bg-BG-second flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-1">
        <h3 className="text-text-primary text-lg font-semibold">Предложения обменов</h3>
        <a
          onClick={(event) => {
            event.stopPropagation()
            dispatchInitiatedBarter(true)
          }}
          className="flex items-center justify-end gap-2 cursor-pointer [&>svg]:w-4 [&>svg]:h-4"
        >
          <span className="text-text-accent text-sm font-medium">Все ({length})</span>
          {length ? null : <IconChevron />}
        </a>
      </div>
      {length ? (
        <div className="w-full flex flex-col gap-[0.3175rem]">
          <p className="text-text-primary text-sm font-normal">
            У вас&nbsp;
            <a
              onClick={(event) => {
                event.stopPropagation()
                dispatchInitiatedBarter(true)
              }}
              className="text-text-accent cursor-pointer"
            >
              {length} новых
            </a>
            &nbsp;предложения
          </p>
          <div className="w-full flex items-center justify-start">
            {images.map((item, index) => (
              <div
                key={`::key::${item}::`}
                className={cx(
                  "w-8 h-8 p-0.5 rounded-full bg-BG-second flex items-center justify-center relative",
                  index !== 0 && "-ml-1.5",
                )}
              >
                <NextImageMotion className="w-7 h-7 rounded-full" src={item!} alt="avatar" width={28} height={28} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-text-primary text-sm font-normal">У вас нет новых предложений по обмену</p>
      )}
    </section>
  )
}
