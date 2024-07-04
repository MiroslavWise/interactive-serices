"use client"

import { cx } from "@/lib/cx"
import { useChatContext } from "./ContextChats"
import { EnumProviderThreads } from "@/types/enum"

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
  const { navigate, dispatchNavigate } = useChatContext()

  return (
    <nav className="w-full flex flex-row flex-nowrap gap-5 pb-0.375">
      {NAV_MENU.map((_) => (
        <a
          key={`::key::nav::chat::${_.value}::`}
          className={cx(
            "relative cursor-pointer",
            "before:content-[''] before:transition-all before:absolute before:top-[calc(100%_+_0.125rem)] before:left-0 before:w-full before:h-0.125 before:scale-x-0 before:opacity-0 before:bg-element-accent-1",
            navigate === _.value && "before:!opacity-100 before:!scale-x-100",
          )}
          onClick={() => {
            dispatchNavigate(_.value)
          }}
        >
          <span className={cx("text-text-secondary text-sm font-medium", navigate === _.value && "!text-text-accent")}>{_.label}</span>
        </a>
      ))}
    </nav>
  )
}

NavigationSelectChat.displayName = "NavigationSelectChat"
export default NavigationSelectChat
