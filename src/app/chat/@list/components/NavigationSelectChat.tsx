"use client"

import { cx } from "@/lib/cx"
import { EnumProviderThreads } from "@/types/enum"
import { useCountMessagesNotReading } from "@/helpers"
import { dispatchSelectChat, useAuth, useSelectChat } from "@/store"
import { useMemo } from "react"

const NAV_MENU: {
  value: EnumProviderThreads | "all"
  label: string
}[] = [
  {
    value: "all",
    label: "Все",
  },
  {
    value: EnumProviderThreads.BARTER,
    label: "Обмены",
  },
  {
    value: EnumProviderThreads.OFFER_PAY,
    label: "Покупки",
  },
  {
    value: EnumProviderThreads.PERSONAL,
    label: "Личные",
  },
]

function NavigationSelectChat() {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const select = useSelectChat(({ select }) => select)
  const { data } = useCountMessagesNotReading(false)
  const items = data || []

  const counter = useMemo(() => {
    const obj: Record<EnumProviderThreads | "all", number> = {
      [EnumProviderThreads.BARTER]: 0,
      [EnumProviderThreads.OFFER_PAY]: 0,
      [EnumProviderThreads.PERSONAL]: 0,
      [EnumProviderThreads.GROUPS]: 0,
      all: 0,
    }

    for (const item of items) {
      const message = item?.messages && item?.messages?.length && item?.messages[0]
      const notRead = !!message && message?.emitterId !== userId && !message?.readIds?.includes(userId!)
      if (notRead) {
        obj[item.provider] = obj[item.provider] + 1
        obj.all = obj.all + 1
      }
    }

    return obj
  }, [items, userId])

  return (
    <nav className="scroll-no overflow-x-auto w-full flex flex-row flex-nowrap gap-5 pb-0.375 ">
      {NAV_MENU.map((_) => (
        <a
          key={`::key::nav::chat::${_.value}::`}
          className={cx(
            "relative cursor-pointer",
            "before:content-[''] before:transition-all before:absolute before:top-[calc(100%_+_0.125rem)] before:left-0 before:w-full before:h-0.125 before:scale-x-0 before:opacity-0 before:bg-element-accent-1",
            select === _.value && "before:!opacity-100 before:!scale-x-100",
            "flex flex-row flex-nowrap items-center gap-1.5",
          )}
          onClick={() => {
            dispatchSelectChat(_.value)
          }}
        >
          <span className={cx("text-text-secondary text-sm font-medium", select === _.value && "!text-text-accent")}>{_.label}</span>
          <div
            className={cx(
              "h-[1.1875rem] min-w-[1.1875rem] items-center justify-center w-min rounded-[0.59375rem] bg-element-accent-1 px-1.5",
              counter[_.value] ? "flex" : "hidden",
            )}
          >
            <span className="text-[0.625rem] font-bold text-text-button">{counter[_.value]}</span>
          </div>
        </a>
      ))}
    </nav>
  )
}

NavigationSelectChat.displayName = "NavigationSelectChat"
export default NavigationSelectChat
