"use client"

import Link from "next/link"
import { useMemo } from "react"
import { type UrlObject } from "url"
import { useQuery } from "@tanstack/react-query"

import type { TCardOffer } from "./types"

import { BlockTitle } from "./components/BlockTitle"
import { BlockBarter } from "./components/BlockBarter"
import { LoadingProfile } from "@/components/common"

import { getUserId } from "@/services"
import { dayFormat, useResize } from "@/helpers"
import { useAuth, useVisibleExchanges } from "@/store"

export const CardOffer: TCardOffer = ({ id, threadId, created, status, initiator, consigner }) => {
  const { id: myUserId } = useAuth(({ auth }) => auth) ?? {}
  const dispatchExchanges = useVisibleExchanges(({ dispatchExchanges }) => dispatchExchanges)
  const { isTablet } = useResize()

  const idUser = useMemo(() => {
    if (!initiator || !consigner) return null
    return Number(initiator?.userId) === Number(myUserId) ? Number(consigner?.userId) : Number(initiator?.userId)
  }, [consigner, initiator, myUserId])

  const { data: dataUser, isLoading: isLoadUser } = useQuery({
    queryFn: () => getUserId(idUser!),
    queryKey: ["user", { userId: idUser }],
    enabled: !!idUser,
  })

  const href: UrlObject = !!threadId
    ? { pathname: `/chat/${threadId}` }
    : !!id
    ? {
        pathname: `/chat`,
        query: {
          "barter-id": `${id}-${idUser}`,
        },
      }
    : {}

  return (
    <li className="w-full flex flex-col gap-2 p-3 h-min rounded-2xl bg-BG-second border border-solid border-grey-stroke-light z-[2]">
      <section className="relative w-full flex flex-col gap-4">
        {isLoadUser ? <LoadingProfile /> : <BlockTitle {...dataUser?.data!} />}
        <BlockBarter {...{ consigner, initiator }} />
      </section>
      <footer className="flex flex-row justify-between items-center h-7">
        <time dateTime={created as unknown as string} className="text-text-secondary text-xs text-start font-medium">
          {dayFormat(created!, "dd.MM.yyyy")}
        </time>
        {!["completed", "destroyed"]?.includes(status) ? (
          <Link
            href={href}
            onClick={(event) => {
              event.stopPropagation()
              if (isTablet) {
                dispatchExchanges({ visible: false })
              }
            }}
            className="relative h-7 w-7 p-3.5 rounded-full bg-element-white border border-solid border-grey-stroke-light"
          >
            <img
              src="/svg/message-dots-circle-primary.svg"
              alt="dots"
              width={16}
              height={16}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4"
            />
          </Link>
        ) : null}
      </footer>
    </li>
  )
}
