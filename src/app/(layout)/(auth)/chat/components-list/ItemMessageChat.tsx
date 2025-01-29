"use client"

import Link from "next/link"
import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"

import { EnumProviderThreads } from "@/types/enum"
import { type IResponseThreads } from "@/services/threads/types"
import { type ISmallDataOfferBarter } from "@/services/barters/types"

import ChatIconProvider from "./ChatIconProvider"
import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { cx } from "@/lib/cx"
import { formatOfMMMM } from "@/helpers"
import { getIdOffer } from "@/services"
import { onNumberOfPhotos } from "@/helpers/number-of-photos"
import { deCrypted, useAuth, useDraftChat, useOnline } from "@/store"
import { typeMessage, userInterlocutor } from "@/helpers/user-interlocutor"

function ItemMessageChat({ item }: { item: IResponseThreads }) {
  const [id, setId] = useQueryState("chat-id-messages", parseAsInteger)
  const users = useOnline(({ users }) => users)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { provider } = item ?? {}
  const cryptMessage = useDraftChat((chats) => chats[item.id])
  const draftMessage = deCrypted(cryptMessage)

  const offerId = item?.provider === EnumProviderThreads.OFFER_PAY ? item?.offerId : null
  const { data: dataOffer } = useQuery({
    queryFn: () => getIdOffer(offerId!),
    queryKey: ["offers", { offerId: offerId! }],
    enabled: !!offerId,
  })
  const user = userInterlocutor({ m: item.emitter, r: item.receivers, userId: userId! })
  const { data: dataO } = dataOffer ?? {}

  const message = item?.messages?.length ? item?.messages?.[0] : null
  const isOnline = users.some((_) => _.id === user?.id!)

  const messageType = typeMessage({ provider: provider, last: message?.message!, offer: dataO! as unknown as ISmallDataOfferBarter })
  const time = item?.messages?.length > 0 ? item?.messages?.[0]?.created! : item?.created
  const lastTime =
    formatOfMMMM(time, "dd:MM:yy") === formatOfMMMM(new Date(), "dd:MM:yy") ? formatOfMMMM(time, "HH:mm") : formatOfMMMM(time, "dd MMMM")

  const reading = useMemo(() => {
    if (!item?.messages || item?.messages?.length === 0) return null
    const lastMessage = item?.messages[0]
    if (lastMessage.emitterId === userId) {
      const read = !!lastMessage.readIds.length
      return (
        <div className="w-5 h-4 px-2.5 py-2 relative">
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4"
          >
            {read ? (
              <>
                <path d="M9.5 12.5L18.5 3.5" stroke="var(--text-accent)" className="stroke-text-accent" strokeWidth="1.5" />
                <path d="M2 8.5L5.5 12L14 3.5" stroke="var(--text-accent)" className="stroke-text-accent" strokeWidth="1.5" />
              </>
            ) : (
              <path d="M6 8.5L9.5 12L18 3.5" stroke="var(--text-accent)" className="stroke-text-accent" strokeWidth="1.5" />
            )}
          </svg>
        </div>
      )
    }
    return null
  }, [item, userId])

  const notRead = !!message && message?.emitterId !== userId && !message?.readIds?.includes(userId!)
  const images = message?.images || []
  const namePhotos = onNumberOfPhotos(images.length)

  const c = (
    <div
      className={cx(
        "w-full grid items-center",
        !!draftMessage
          ? ""
          : images.length
          ? notRead
            ? images.length === 1
              ? `grid-cols-[1rem_minmax(0,1fr)_1.1875rem] gap-1.5`
              : `grid-cols-[2.125rem_minmax(0,1fr)_1.1875rem] gap-1.5`
            : images.length === 1
            ? `grid-cols-[1rem_minmax(0,1fr)] gap-1.5`
            : `grid-cols-[2.125rem_minmax(0,1fr)] gap-1.5`
          : notRead
          ? "grid-cols-[minmax(0,1fr)_1.1875rem] gap-2.5"
          : "grid-cols-[minmax(0,1fr)] gap-2.5",
      )}
    >
      <div className={cx(images.length === 0 ? "hidden" : "flex flex-row flex-nowrap gap-0.5")}>
        {images.slice(0, 2).map((item) => (
          <div
            key={`key::img::list::${item.id}::`}
            className={cx(
              "relative w-4 h-4 rounded-[0.0625rem] p-2 overflow-hidden",
              "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4",
            )}
          >
            <NextImageMotion src={item.attributes.url!} alt="offer-image" width={40} height={40} hash={item.attributes?.blur} />
          </div>
        ))}
      </div>
      <p
        className={cx(
          "font-normal text-sm text-left line-clamp-1 text-ellipsis",
          images.length && !message?.message ? "text-text-accent" : "text-text-secondary",
        )}
      >
        <span className={draftMessage ? "text-text-error" : "hidden"}>Черновик: </span>
        {draftMessage ? draftMessage : message?.message ? message?.message : !!images.length ? namePhotos : "Нет сообщений"}
      </p>
      <div
        className={cx(
          "w-[1.1875rem] h-[1.1875rem] rounded-full bg-element-accent-1 relative p-[0.59375rem]",
          notRead ? "flex" : "hidden opacity-0 invisible",
        )}
      >
        <span className="text-text-button text-[0.625rem] text-center font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          1
        </span>
      </div>
    </div>
  )

  return (
    <li
      key={`::key::chat::${item.id}::`}
      className={cx(
        "w-full py-2.5 pl-2.5 grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 rounded-.625 hover:bg-grey-field items-center cursor-pointer",
        id === item.id && "!bg-grey-field",
      )}
      onClick={(event) => setId(item.id)}
    >
      <div className="relative w-[3.25rem] h-[3.25rem] p-[1.625rem] bg-grey-stroke-light rounded-full">
        {user && user?.image ? (
          <NextImageMotion
            src={user?.image?.attributes?.url}
            alt="avatar"
            width={80}
            height={80}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3.25rem] h-[3.25rem] rounded-[1.625rem] overflow-hidden z-10"
            hash={user?.image?.attributes?.blur}
          />
        ) : (
          <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.95rem] h-[1.95rem]" />
        )}
        <ChatIconProvider provider={provider} />
        <div
          className={cx(
            isOnline
              ? "absolute z-20 -bottom-1 right-1 w-[0.9375rem] h-[0.9375rem] rounded-full flex items-center justify-center bg-BG-second"
              : "!hidden",
          )}
        >
          <span className="w-[0.5625rem] h-[0.5625rem] rounded-full bg-more-green" />
        </div>
      </div>
      <article className="w-full flex flex-col items-start justify-center pr-2.5 overflow-hidden">
        <div className="w-full flex flex-row flex-nowrap items-center justify-between gap-2 ">
          <h4 className="text-text-primary font-medium text-ellipsis line-clamp-1 whitespace-nowrap">
            {user?.firstName || "Имя"} {user?.lastName || ""}
          </h4>
          <div className="flex flex-nowrap flex-row items-center gap-0.5">
            {reading}
            <time
              className="text-text-secondary text-[0.8125rem] font-normal whitespace-nowrap"
              style={{
                wordWrap: "break-word",
              }}
            >
              {lastTime}
            </time>
          </div>
        </div>
        <p className="text-text-primary font-normal text-sm text-left line-clamp-1 text-ellipsis whitespace-nowrap">{messageType}</p>
        <p className="text-text-secondary">{c}</p>
      </article>
    </li>
  )
}

ItemMessageChat.displayName = "ItemMessageChat"
export default memo(ItemMessageChat)
