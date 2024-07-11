import { memo, RefObject, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumProviderThreads } from "@/types/enum"
import { type IResponseThread } from "@/services/threads/types"

import ItemBarter from "./ItemBarter"
import ItemMessage from "./ItemMessage"
import LoadingList from "./LoadingList"
import ExchangeStatus from "./ExchangeStatus"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useWebSocket } from "@/context"
import { getMessages, postReadMessage } from "@/services"

function ListMessages({ thread, ferUl }: { thread: IResponseThread; ferUl: RefObject<HTMLUListElement> }) {
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

  const items = dataMessages?.data || []

  useEffect(() => {
    setTimeout(() => {
      if (items?.length > 0) {
        if (ferUl.current) {
          const top = ferUl.current.scrollHeight
          ferUl.current.scroll({
            top: top + 270,
            behavior: "instant",
          })
        }
      }
    })
  }, [items])

  useEffect(() => {
    if (items && userId && Array.isArray(items)) {
      if (items.length) {
        const notMyMessages = items?.filter((item) => item.receiverIds.includes(userId))
        const notReading = notMyMessages?.filter((item) => !item?.readIds?.includes(userId))?.map((item) => item?.id)

        Promise.all(notReading.map((item) => postReadMessage(item)))
      }
    }
  }, [userId, items])

  useEffect(() => {
    function chatResponse(event: any) {
      if (Number(event?.threadId) === Number(thread?.id)) {
        refetch()
        console.log("chatResponse: -------------")
      }
    }

    socket?.on(`chatResponse-${userId}`, chatResponse)

    return () => {
      socket?.off(`chatResponse-${userId}`, chatResponse)
    }
  }, [socket, thread?.id, userId])

  if (isLoading || !thread) return <LoadingList />

  return (
    <section className="w-full h-screen flex flex-col items-center max-h-screen md:max-h-[calc(100vh_-_var(--height-header-nav-bar)_-_3rem)] pt-[3.25rem] md:pt-[4.25rem] max-md:overflow-hidden">
      <ExchangeStatus thread={thread} isLoading={isLoading} />
      <ul
        className={cx(
          "w-full md:h-full md:max-w-[50rem] overflow-y-scroll flex flex-col gap-1 pb-[4.75rem] md:pb-[5.75rem] scroll-no px-3 md:px-5 pt-3 md:pt-5",
          "first:[&>li]:mt-auto",
        )}
        ref={ferUl}
      >
        <ItemBarter thread={thread} />
        {!!items.length ? (
          items.map((message) => <ItemMessage key={`::key::message::${message?.id!}::`} message={message} />)
        ) : !items.length && thread?.provider === EnumProviderThreads.PERSONAL ? (
          <article className="w-full mt-auto mb-auto flex items-center justify-center">
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
export default memo(ListMessages)
