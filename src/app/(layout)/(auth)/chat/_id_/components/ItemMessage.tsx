import { type IMessages } from "../ComponentCurrentChat"

import ItemImages from "./ItemImages"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { timeNowOrBeforeChatHours } from "@/lib/timeNowOrBefore"

const ReadingForPhoto = ({ message, lastTime }: { message: IMessages; lastTime: string }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  if (message.emitterId !== userId) return null
  const isRead = !!message.readIds.length

  return (
    <section className="bg-translucent-0.8 absolute right-2.5 bottom-2.5 flex flex-row flex-nowrap w-min gap-1 items-center z-10 h-5 rounded-.625 py-0.5 px-1.5">
      <time className="text-text-button font-normal text-xs">{lastTime}</time>
      <div className="w-5 h-4 px-2.5 py-2 relative">
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4"
        >
          {isRead ? (
            <>
              <path d="M9.5 12.5L18.5 3.5" stroke="var(--text-button)" className="stroke-text-button" strokeWidth="1.5" />
              <path d="M2 8.5L5.5 12L14 3.5" stroke="var(--text-button)" className="stroke-text-button" strokeWidth="1.5" />
            </>
          ) : (
            <path d="M6 8.5L9.5 12L18 3.5" stroke="var(--text-button)" className="stroke-text-button" strokeWidth="1.5" />
          )}
        </svg>
      </div>
    </section>
  )
}

const IsReading = ({ message }: { message: IMessages }) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  if (message.emitterId !== userId) return null

  const isRead = !!message.readIds.length

  return (
    <div className="w-5 h-4 px-2.5 py-2 relative">
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4"
      >
        {isRead ? (
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

function ItemMessage({ message }: { message: IMessages }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const lastTime = timeNowOrBeforeChatHours(message?.created! || new Date())

  const images = message?.images || []
  const strings = message?.imagesString || []

  const { emitter } = message ?? {}
  return (
    <li
      className={cx("w-full flex flex-col gap-1", userId === message.emitterId ? "items-end *:bg-BG-chat" : "items-start *:bg-grey-field")}
    >
      <ItemImages images={images} strings={strings}>
        <ReadingForPhoto {...{ message, lastTime: lastTime! }} />
      </ItemImages>
      <article
        className={cx(
          "py-2 px-3 rounded-2xl overflow-hidden md:max-w-[23.375rem] max-w-[86%]",
          message.message ? "flex flex-col" : "hidden",
        )}
      >
        <p className={cx(emitter?.id === userId ? "hidden" : "text-text-accent text-sm font-medium whitespace-nowrap text-ellipsis")}>
          {emitter?.firstName ?? "Имя"} {emitter?.lastName ?? null}
        </p>
        <p className="text-text-primary text-sm font-normal flex flex-wrap flex-row break-words whitespace-pre-wrap">
          {message.message}
          <span className="flex flex-row gap-0.5 flex-nowrap pl-2 items-end ml-auto">
            <time className="text-text-secondary text-xs text-right font-normal">{lastTime}</time>
            <IsReading message={message} />
          </span>
        </p>
      </article>
    </li>
  )
}

ItemMessage.displayName = "ItemMessage"
export default ItemMessage
