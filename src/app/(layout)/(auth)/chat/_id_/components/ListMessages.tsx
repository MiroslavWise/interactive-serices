import { useQuery } from "@tanstack/react-query"
import { type RefObject, useEffect, Fragment, type Dispatch, type SetStateAction, useMemo } from "react"

import { EnumProviderThreads } from "@/types/enum"
import { type IMessages } from "../ComponentCurrentChat"
import { type IResponseThread } from "@/services/threads/types"

import ItemMessage from "./ItemMessage"
import LoadingList from "./LoadingList"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useWebSocket } from "@/context"
import { getMessages, postReadMessage } from "@/services"

interface IProps {
  messages: IMessages[]
  thread: IResponseThread
  ferUl: RefObject<HTMLUListElement>
  setMessages: Dispatch<SetStateAction<IMessages[]>>
}

function ListMessages({ thread, ferUl, setMessages, messages }: IProps) {
  const { socket } = useWebSocket() ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const {
    data: dataMessages,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getMessages({ thread: thread?.id! }),
    queryKey: ["messages", { threadId: thread?.id! }],
    refetchOnMount: true,
    enabled: !!thread?.id,
  })

  const items = dataMessages?.data ?? []

  useEffect(() => {
    if (!isLoading && dataMessages?.data) {
      setMessages(items)
    }
  }, [items, isLoading, dataMessages])

  useEffect(() => {
    setTimeout(() => {
      if (messages?.length > 0) {
        if (ferUl.current) {
          const top = ferUl.current.scrollHeight
          ferUl.current.scroll({
            top: top + 270,
            behavior: "instant",
          })
        }
      }
    })
  }, [messages])

  useEffect(() => {
    if (items && userId && Array.isArray(items)) {
      if (items.length > 0) {
        const array: number[] = []

        for (const item of items) {
          if (item.receiverIds.includes(userId)) {
            if (!item?.readIds?.includes(userId)) {
              array.push(item.id)
            }
          }
        }

        if (array.length > 0) {
          Promise.all(array.map((item) => postReadMessage(item)))
        }
      }
    }
  }, [userId, items])

  useEffect(() => {
    const chatResponse = (event: any) => (Number(event?.threadId) === Number(thread?.id) ? refetch() : null)
    socket?.on(`chatResponse-${userId}`, chatResponse)
    return () => {
      socket?.off(`chatResponse-${userId}`, chatResponse)
    }
  }, [socket, thread?.id, userId])

  const firstNotRead = useMemo(() => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].readIds.length === 0 && items[i].emitterId !== userId) {
        return i
      }
    }
    return null
  }, [items.length, userId])

  if (isLoading || !thread) return <LoadingList />

  return (
    <section className="w-full h-full max-md:h-dvh flex flex-col items-center max-h-screen md:max-h-[calc(100dvh_-_var(--height-header-nav-bar)_-_3rem)] pt-[3.25rem] md:pt-[4.25rem] max-md:overflow-hidden">
      <ul
        className={cx(
          "w-full md:h-full md:max-w-[50rem] overflow-y-scroll flex flex-col gap-1 pb-[4rem] md:pb-[4.5rem] scroll-no px-3 md:px-5 pt-3 md:pt-5",
          "first:[&>li]:mt-auto last:*:mb-3 md:last:*:mb-5",
        )}
        ref={ferUl}
      >
        {!!messages.length ? (
          messages.map((message, index) => (
            <Fragment key={`::key::message::${message?.id!}::`}>
              {index === firstNotRead ? (
                <article
                  className={cx(
                    index === firstNotRead
                      ? `w-full flex flex-row items-center py-2.5 gap-5 ${index === 0 ? "" : "mt-auto"}`
                      : "!hidden mt-auto",
                  )}
                >
                  <div className="w-full h-[1px] bg-grey-stroke" />
                  <span className="whitespace-nowrap text-text-secondary text-sm text-center font-normal w-min">
                    Непрочитанные сообщения
                  </span>
                  <div className="w-full h-[1px] bg-grey-stroke" />
                </article>
              ) : null}
              <ItemMessage message={message} />
            </Fragment>
          ))
        ) : !messages.length && thread?.provider === EnumProviderThreads.PERSONAL ? (
          <article className="w-full my-auto flex items-center justify-center">
            <div
              className="h-11 py-3 px-5 rounded-[1.375rem] flex items-center justify-center"
              style={{ background: "linear-gradient(95deg, #B3D2FF -26.18%, #D8BAFF 130.54%)" }}
            >
              <span className="text-text-button text-sm text-center font-normal">Нет сообщений</span>
            </div>
          </article>
        ) : null}
      </ul>
    </section>
  )
}

ListMessages.displayName = "ListMessages"
export default ListMessages
