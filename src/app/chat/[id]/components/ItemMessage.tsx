import { type IResponseMessage } from "@/services/messages/types"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { timeNowOrBeforeChatHours } from "@/lib/timeNowOrBefore"
import { useMemo } from "react"

function ItemMessage({ message }: { message: IResponseMessage }) {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const lastTime = timeNowOrBeforeChatHours(message?.created! || new Date())

  const reading = useMemo(() => {
    if (message.emitterId !== userId) return null
    const isRead = !!message.readIds.length
    return (
      <div className="w-5 h-4 px-2.5 py-2 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4"
        >
          {isRead ? (
            <>
              <path d="M9.5 12.5L18.5 3.5" stroke="var(--text-accent)" className="stroke-text-accent" stroke-width="1.5" />
              <path d="M2 8.5L5.5 12L14 3.5" stroke="var(--text-accent)" className="stroke-text-accent" stroke-width="1.5" />
            </>
          ) : (
            <path d="M6 8.5L9.5 12L18 3.5" stroke="var(--text-accent)" className="stroke-text-accent" stroke-width="1.5" />
          )}
        </svg>
      </div>
    )
  }, [message, userId])

  return (
    <li
      className={cx(
        "w-full flex flex-row",
        userId === message.emitterId ? "justify-end *:bg-BG-chat" : "justify-start *:bg-grey-field",
        "md:*:max-w-[23.375rem] *:max-w-[86%]",
      )}
    >
      <article className="py-2 px-3 rounded-2xl">
        <p className="text-text-primary text-sm font-normal flex flex-wrap flex-row">
          {message.message}
          <span className="flex flex-row gap-0.5 flex-nowrap pl-2 items-end ml-auto">
            <time className="text-text-secondary text-xs text-right font-normal">{lastTime}</time>
            {reading}
          </span>
        </p>
      </article>
    </li>
  )
}

ItemMessage.displayName = "ItemMessage"
export default ItemMessage
