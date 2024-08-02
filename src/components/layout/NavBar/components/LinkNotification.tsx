import Link from "next/link"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { type IResponseNotifications } from "@/services/notifications/types"

import { ItemNotification } from "@/components/notifications"

import { useAuth } from "@/store"
import { useOutsideClickEvent } from "@/helpers"
import { serviceNotifications } from "@/services"
import { MENU_ICONS } from "../constants/menu-icons"
import { cx } from "@/lib/cx"

export const LinkNotification = ({ pathname }: { pathname: string }) => {
  const [count, setCount] = useState<number | null>(null)
  const [state, setState] = useState<{ new: IResponseNotifications[]; old: IResponseNotifications[] }>({ new: [], old: [] })
  const [active, setActive, ref] = useOutsideClickEvent(writingNotifications)
  const { id } = useAuth(({ auth }) => auth) ?? {}

  const { data, refetch } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: id }],
    refetchOnMount: true,
    refetchOnReconnect: true,
    enabled: !!id,
  })

  useEffect(() => {
    if (data?.res && data?.res?.length > 0) {
      let count = 0
      const newArray: IResponseNotifications[] = []
      const oldArray: IResponseNotifications[] = []

      for (const item of data?.res) {
        if (item.read) {
          oldArray.push(item)
        } else {
          newArray.push(item)
          count += 1
        }
      }
      setState({ new: newArray, old: oldArray })
      setCount(count || null)
    }
  }, [data?.res])

  function writingNotifications() {
    if (data?.res) {
      const notRead: number[] = []
      data?.res?.forEach((item) => {
        if (item.read === false) {
          notRead.push(item.id)
        }
      })
      if (notRead.length > 0) {
        Promise.all([...notRead.map((item) => serviceNotifications.patch({ enabled: true, read: true }, item!))]).then(() => refetch())
      }
    }
  }

  return (
    <a
      key={"::notifications::link::"}
      data-active={pathname?.includes("/notifications")}
      data-notification
      onClick={(event) => {
        setActive((state) => !state)
        event.stopPropagation()
      }}
      ref={ref}
    >
      {MENU_ICONS.notifications}
      <span>Уведомления</span>
      {count ? (
        <div data-count>
          <span>{count > 9 ? "9+" : count}</span>
        </div>
      ) : null}
      <section
        data-active={active}
        onClick={(event) => event.stopPropagation()}
        className={cx(
          "absolute top-[calc(100%_+_0.25rem)] w-[29.5rem] left-0 rounded-[2rem] bg-BG-second overflow-hidden flex flex-col shadow-menu-absolute transition-all",
          active ? "translate-y-0 opacity-100 visible" : "-translate-y-8 invisible opacity-0",
        )}
      >
        {data?.res?.length ? (
          <ul className="w-full max-h-[calc(41.875rem_-_2.5rem)] h-min overflow-x-hidden overflow-y-auto p-6 flex flex-col gap-2.5">
            {state.new.length > 0 ? (
              <>
                <p>Новые уведомления</p>
                {state.new?.map((item) => (
                  <ItemNotification key={`::item::notification::popup::`} {...item} />
                ))}
              </>
            ) : null}
            {state.old.length > 0 ? (
              <>
                <p className="text-text-primary text-base text-left font-medium">Просмотренные</p>
                {state.old?.map((item) => (
                  <ItemNotification key={`::item::notification::popup::`} {...item} />
                ))}
              </>
            ) : null}
          </ul>
        ) : (
          <article className="w-full py-2.5 px-[3.125rem] flex flex-col items-center gap-4">
            <h3 className="text-text-primary text-center text-xl font-semibold">У вас пока нет уведомлений</h3>
            <p className="text-text-secondary text-center text-base font-medium">
              Здесь будут появляться уведомления о новых дискуссия и SOS-сообщениях, отзывах, статусах предложений и многое другое.
            </p>
          </article>
        )}
        <footer className="w-full h-10 flex items-center justify-center px-0 pt-[0.5625rem] pb-[0.6875rem] border-t border-solid border-grey-stroke-light">
          <Link
            href={{ pathname: "/notifications" }}
            onClick={(event) => {
              event.stopPropagation()
              setActive(false)
            }}
            prefetch
            className="text-text-accent text-center text-sm font-medium"
          >
            Посмотреть все
          </Link>
        </footer>
      </section>
    </a>
  )
}
