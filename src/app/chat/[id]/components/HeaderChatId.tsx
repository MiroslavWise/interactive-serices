"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { EnumProviderThreads } from "@/types/enum"
import { type IResponseThread } from "@/services/threads/types"

import AbsoluteMenu from "./AbsoluteMenu"
import { NextImageMotion } from "@/components/common"
import LoadingHeader from "../../components/LoadingHeader"
import IconArrowLeft from "@/components/icons/IconArrowLeft"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { useAuth, useOnline } from "@/store"
import { getBarterId, getIdOffer } from "@/services"
import { typeMessage, userInterlocutor } from "@/helpers/user-interlocutor"
import ButtonCollapse from "./ButtonCollapse"

function HeaderChatId({ thread, isLoadingThread }: { thread: IResponseThread; isLoadingThread: boolean }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const user = userInterlocutor({ m: thread?.emitter!, r: thread?.receivers!, userId: userId! })
  const users = useOnline(({ users }) => users)
  const message = thread?.messages?.length ? thread?.messages?.[0]?.message : null
  const { firstName, lastName } = user ?? {}

  const barterId = thread?.provider === EnumProviderThreads.BARTER ? thread?.barterId : null
  const { data: dataBarter } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId! }],
    enabled: !!barterId,
  })

  const offerId = thread?.provider === EnumProviderThreads.OFFER_PAY ? thread?.offerId : null
  const { data: dataOffer } = useQuery({
    queryFn: () => getIdOffer(thread?.offerId!),
    queryKey: ["offers", { offerId: thread?.offerId! }],
    enabled: !!offerId,
  })

  const { data: dataB } = dataBarter ?? {}
  const { data: dataO } = dataOffer ?? {}
  const offer = user?.id === dataB?.consigner?.userId ? dataB?.consigner : user?.id === dataB?.initiator?.userId ? dataB?.initiator : null
  const messageType = typeMessage({ provider: thread?.provider, last: message, offer: offer! || dataO })

  const isOnline = users.some((_) => _.id === user?.id!)

  if (isLoadingThread) return <LoadingHeader />

  return (
    <header className="absolute z-50 top-0 left-0 right-0 w-full py-1.5 md:py-[0.9375rem] px-1.5 md:px-5 grid md:grid-cols-[1.25rem_minmax(0,1fr)_4.5rem] grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-1 md:gap-4 bg-BG-second border-b border-solid border-grey-stroke md:h-[4.25rem] h-[3.25]">
      <Link
        href={{ pathname: "/chat" }}
        className="w-10 md:w-5 h-10 md:h-5 p-5 md:p-2.5 relative cursor-pointer *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5"
      >
        <IconArrowLeft />
      </Link>
      <article className="w-full items-center gap-2.5 md:gap-3 grid grid-cols-[2.25rem_minmax(0,1fr)]">
        <Link href={{ pathname: `/customer/${user?.id}` }} prefetch className="w-9 h-9 overflow-hidden rounded-full relative">
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
        </Link>
        <div className="w-full flex flex-col gap-0.5">
          <div className="flex flex-row items-center justify-start gap-1">
            <Link
              href={{ pathname: `/customer/${user?.id}` }}
              prefetch={false}
              className="text-text-primary text-sm text-left font-medium text-ellipsis line-clamp-1"
            >
              {firstName || "Имя"} {lastName || "Фамилия"}
            </Link>
            <div className="w-5 h-5 relative p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[1.125rem] *:h-[1.125rem] *:z-30">
              <IconVerifiedTick />
            </div>
            <div className={cx("ml-1 flex-row justify-start items-center", isOnline ? "flex" : "hidden")}>
              <span className="text-[0.8125rem] text-text-secondary font-normal">в сети</span>
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
        <ButtonCollapse />
      </div>
    </header>
  )
}

HeaderChatId.displayName = "HeaderChatId"
export default HeaderChatId
