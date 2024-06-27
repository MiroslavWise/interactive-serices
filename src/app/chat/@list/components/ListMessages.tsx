"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useCallback, useMemo } from "react"

import { type IUserOffer } from "@/services/offers/types"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useChatContext } from "./ContextChats"
import { getMillisecond, useCountMessagesNotReading } from "@/helpers"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { NextImageMotion } from "@/components/common"

function ListMessages() {
  const params = useParams()
  const { id } = (params as { id?: string | number }) ?? {}
  console.log("ListMessages id: ", id)
  const userId = useAuth(({ auth }) => auth?.id)
  const { search, navigate } = useChatContext()

  const { data } = useCountMessagesNotReading()

  const items = data?.res || []

  const filters = useMemo(() => {
    const ITEMS = items
    ITEMS.sort((prev, next) => {
      const prevNumber = prev.messages?.[0]?.created! ? getMillisecond(prev.messages?.[0]?.created!) : getMillisecond(prev?.created!)
      const nextNumber = next.messages?.[0]?.created! ? getMillisecond(next.messages?.[0]?.created!) : getMillisecond(next?.created!)
      return nextNumber - prevNumber
    })

    return ITEMS
  }, [items])

  const userFriend = useCallback(
    ({ m, r }: { m: IUserOffer; r: IUserOffer[] }) => {
      if (m.id === userId) return r[0]
      if (r.some((_) => _.id === userId)) return m
      return null
    },
    [userId],
  )

  const filterNavigate = useMemo(() => {
    if (navigate === "all") return filters

    return filters.filter((_) => _.provider === navigate)
  }, [navigate, filters])

  return (
    <ul className="w-full p-0.625 overflow-x-hidden overflow-y-scroll flex flex-col gap-0.125">
      {filterNavigate.map((item) => {
        const user = userFriend({ m: item.emitter, r: item.receivers })
        const message = item?.messages?.length ? item?.messages?.[0]?.message : null
        return (
          <Link
            key={`::key::chat::${item.id}::`}
            href={{ pathname: `/chat/${item.id}` }}
            className={cx(
              "w-full py-0.625 pl-0.625 grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 rounded-[0.625rem] hover:bg-grey-field",
              id && Number(id) === item.id && "!bg-grey-field",
            )}
          >
            <div className="relative w-[3.25rem] h-[3.25rem] p-[1.625rem]">
              {user && user?.image ? (
                <NextImageMotion
                  src={user?.image?.attributes?.url}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3.25rem] h-[3.25rem] rounded-[1.625rem] overflow-hidden z-10"
                />
              ) : (
                <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.95rem] h-[1.95rem]" />
              )}
            </div>
            <article className="w-full flex flex-col items-start justify-center">
              <h4 className="text-text-primary text-sm text-left font-medium">
                {user?.firstName || "*Имя"} {user?.lastName || "*Фамилия"}
              </h4>
              <p className="text-text-secondary text-sm text-left line-clamp-1 text-ellipsis font-normal">{message || "Нет сообщений"}</p>
            </article>
          </Link>
        )
      })}
    </ul>
  )
}

ListMessages.displayName = "ListMessages"
export default ListMessages
