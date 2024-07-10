import { useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"

import { type IResponseThread } from "@/services/threads/types"

import ItemMessage from "./ItemMessage"

import { useAuth } from "@/store"
import { useWebSocket } from "@/context"
import { getMessages, postReadMessage } from "@/services"
import ItemBarter from "./ItemBarter"
import { EnumProviderThreads } from "@/types/enum"
import { cx } from "@/lib/cx"

function ListMessages({ thread }: { thread: IResponseThread }) {
  const ferUl = useRef<HTMLUListElement>(null)
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
            behavior: "smooth",
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
      if (event?.threadId === Number(thread?.id)) {
        if (event?.receiverIds?.includes(userId)) {
          refetch()
        }
      }
    }

    socket?.on(`chatResponse-${userId}`, chatResponse)

    return () => {
      socket?.off(`chatResponse-${userId}`, chatResponse)
    }
  }, [socket, thread?.id, userId])

  if (isLoading || !thread)
    return (
      <section className="w-full h-full flex items-center justify-center">
        <article className="w-8 h-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="animate-spin w-8 h-8">
            <path
              d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM4.8 16C4.8 22.1856 9.81441 27.2 16 27.2C22.1856 27.2 27.2 22.1856 27.2 16C27.2 9.81441 22.1856 4.8 16 4.8C9.81441 4.8 4.8 9.81441 4.8 16Z"
              fill="var(--text-accent)"
              fill-opacity="0.12"
              className="fill-text-accent"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.6082 5.79184C19.8927 5.4688 19.1463 5.22245 18.3817 5.05605C18.1418 5.00384 17.9091 4.92533 17.6891 4.82363C16.7213 4.3762 16 3.47988 16 2.39988C16 1.0744 17.0804 -0.0185381 18.391 0.179546C18.7303 0.230818 19.0676 0.29296 19.4024 0.365836C20.372 0.576839 21.321 0.877835 22.237 1.26555C22.7691 1.49081 23.2901 1.74533 23.7974 2.02848C26.181 3.35875 28.1846 5.27669 29.6176 7.59989C31.0507 9.92309 31.8656 12.5743 31.9847 15.3013C32.0101 15.8818 32.0038 16.4616 31.9663 17.0382C31.9017 18.0308 31.7448 19.0139 31.4983 19.9751C31.4132 20.307 31.3173 20.6363 31.2109 20.9625C30.7998 22.2226 29.3383 22.6977 28.1537 22.1029C27.1886 21.6182 26.7113 20.5714 26.7457 19.5057C26.7536 19.2635 26.7878 19.0203 26.8488 18.7825C27.0432 18.0246 27.158 17.247 27.1904 16.4626C27.2035 16.1462 27.2032 15.8287 27.1893 15.5109C27.1059 13.602 26.5355 11.7461 25.5323 10.1199C24.5292 8.49365 23.1267 7.15109 21.4582 6.2199C21.1804 6.06489 20.8968 5.92213 20.6082 5.79184Z"
              fill="var(--text-accent)"
              className="fill-text-accent"
            />
          </svg>
        </article>
      </section>
    )

  return (
    <section className="w-full h-full flex flex-col items-center ">
      <ul
        className={cx(
          "w-full h-full max-w-[50rem] overflow-y-scroll flex flex-col gap-1 pt-[3.75rem] md:pt-20 pb-2.5 md:pb-5 scroll-no px-3 md:px-5",
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
export default ListMessages
