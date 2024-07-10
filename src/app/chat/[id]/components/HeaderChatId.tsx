"use client"

import Link from "next/link"

import { type IResponseThread } from "@/services/threads/types"

import AbsoluteMenu from "./AbsoluteMenu"
import { NextImageMotion } from "@/components/common"
import IconArrowLeft from "@/components/icons/IconArrowLeft"
import IconArrowRight from "@/components/icons/IconArrowRight--"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { typeMessage, userInterlocutor } from "@/helpers/user-interlocutor"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"
import { getBarterId } from "@/services"
import { useQuery } from "@tanstack/react-query"
import { EnumProviderThreads } from "@/types/enum"

function HeaderChatId({ thread, isLoadingThread }: { thread: IResponseThread; isLoadingThread: boolean }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const user = userInterlocutor({ m: thread?.emitter!, r: thread?.receivers!, userId: userId! })

  const message = thread?.messages?.length ? thread?.messages?.[0]?.message : null
  const { firstName, lastName } = user ?? {}

  const barterId = thread?.provider === EnumProviderThreads.BARTER ? thread?.barterId : null
  const { data: dataBarter } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId! }],
    enabled: !!barterId,
  })
  const { data } = dataBarter ?? {}
  const offer = user?.id === data?.consigner?.userId ? data?.consigner : user?.id === data?.initiator?.userId ? data?.initiator : null
  const messageType = typeMessage({ provider: thread?.provider, last: message, offer: offer! })

  if (isLoadingThread)
    return (
      <header className="loading-screen absolute top-0 left-0 right-0 w-full p-1.5 md:py-[0.9375rem] md:px-5 grid md:grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-1 md:gap-4 bg-BG-second border-b border-solid border-grey-stroke md:h-[4.25rem]">
        <Link
          href={{ pathname: "/chat" }}
          className="w-10 md:w-5 h-10 md:h-5 p-5 md:p-2.5 relative cursor-pointer *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
        >
          <IconArrowLeft />
        </Link>
        <article className="w-full grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2.5 items-center">
          <span className="w-9 h-9 rounded-full" />
          <div className="w-full flex flex-col gap-1 *:h-4 *:rounded-lg">
            <span className="max-w-[15.875rem]" />
            <span className="max-w-[9.375rem]" />
          </div>
        </article>
      </header>
    )

  return (
    <header className="absolute z-50 top-0 left-0 right-0 w-full py-1.5 md:py-[0.9375rem] px-1.5 md:px-5 grid md:grid-cols-[1.25rem_minmax(0,1fr)_4.5rem] grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-1 md:gap-4 bg-BG-second border-b border-solid border-grey-stroke md:h-[4.25rem] h-[3.25]">
      <Link
        href={{ pathname: "/chat" }}
        className="w-10 md:w-5 h-10 md:h-5 p-5 md:p-2.5 relative cursor-pointer *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
      >
        <IconArrowLeft />
      </Link>
      <article className="w-full items-center gap-2.5 md:gap-3 grid grid-cols-[2.25rem_minmax(0,1fr)]">
        <div className="w-9 h-9 overflow-hidden rounded-full relative">
          {user && user?.image ? (
            <NextImageMotion
              src={user?.image?.attributes?.url}
              alt="avatar"
              width={40}
              height={40}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full overflow-hidden z-10"
            />
          ) : (
            <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 z-10" />
          )}
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <div className="flex flex-row items-center justify-start gap-1">
            <h3 className="text-text-primary text-sm text-left font-medium text-ellipsis line-clamp-1">
              {firstName || "Имя"} {lastName || "Фамилия"}
            </h3>
            <div className="w-5 h-5 relative p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[1.125rem] *:h-[1.125rem] *:z-30">
              <IconVerifiedTick />
            </div>
          </div>
          <p className="text-[0.8125rem] text-text-primary font-normal text-ellipsis line-clamp-1">{messageType || " "}</p>
        </div>
      </article>
      <div
        className={cx(
          "pl-1 flex flex-row items-center gap-5 flex-nowrap",
          "*:w-10 md:*:w-5 *:h-10 md:*:h-5 *:relative *:p-5 md:*:p-2.5 *:border-none *:outline-none *:bg-transparent",
          "[&>button>svg]:absolute [&>button>svg]:top-1/2 [&>button>svg]:left-1/2 [&>button>svg]:-translate-x-1/2 [&>button>svg]:-translate-y-1/2 [&>button>svg]:w-5 [&>button>svg]:h-5",
        )}
      >
        <AbsoluteMenu thread={thread} />
        <button type="button" className="max-md:hidden">
          <IconArrowRight />
        </button>
      </div>
    </header>
  )
}

HeaderChatId.displayName = "HeaderChatId"
export default HeaderChatId
