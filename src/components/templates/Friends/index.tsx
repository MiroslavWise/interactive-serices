"use client"

import { useState } from "react"

import { IconXClose } from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { SEGMENT_FRIENDS, type TFriends } from "./constants/segments"
import { dispatchCloseFriends, useFriends } from "@/store"
import ListAll from "./components/ListAll"

function Friends() {
  const visible = useFriends(({ visible }) => visible)
  const [state, setState] = useState<TFriends>("all")

  return (
    <div
      className={cx(
        "fixed bg-translucent -z-10 invisible opacity-0 inset-0 flex flex-col items-end",
        visible && "!z-[1000] !visible !opacity-100",
      )}
    >
      <section className="relative bg-BG-second md:max-w-[35.625rem] md:rounded-l-3xl w-full h-full">
        <button
          type="button"
          onClick={dispatchCloseFriends}
          className={cx(
            "absolute top-0 md:top-6 left-full md:-left-2.5 -translate-x-full md:bg-BG-second w-12 h-12 rounded-full p-3.5 flex items-center justify-center z-20",
            "*:w-5 *:h-5 [&>svg>path]:stroke-text-primary",
          )}
        >
          <IconXClose />
        </button>
        <header className="w-full flex items-center justify-center py-6 px-3">
          <h3 className="text-text-primary text-2xl font-semibold">Друзья</h3>
        </header>
        <div className="w-full px-5 pt-2.5">
          <nav className="w-full bg-BG-second border border-grey-stroke border-solid grid grid-cols-2 gap-0 h-11 rounded-[1.375rem] items-center px-1">
            {SEGMENT_FRIENDS.map((item) => (
              <a
                key={`:key:friend:${item.value}:`}
                className={cx(
                  "w-full h-9 rounded-[1.125rem] flex items-center justify-center py-2 px-4",
                  state === item.value ? "bg-element-accent-2" : "bg-transparent cursor-pointer",
                )}
                onClick={() => setState(item.value)}
              >
                <span className={cx("text-sm text-center font-medium", state === item.value ? "text-text-tab" : "text-text-secondary")}>
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </div>
        <ListAll state={state} />
      </section>
    </div>
  )
}

Friends.displayName = "Friends"
export default Friends
