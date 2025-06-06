import Link from "next/link"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { type IResponseNotifications } from "@/services/notifications/types"

import { IconSprite } from "@/components/icons/icon-sprite"
import { ItemNotification } from "@/components/notifications"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { useOutsideClickEvent } from "@/helpers"
import { serviceNotifications } from "@/services"
import { DESCRIPTION_NOTIFICATIONS_EMPTY } from "@/components/templates/NotificationsMobile/constants/navigation"

const TITLE = "Уведомления"

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
    if (data?.data && data?.data?.length > 0) {
      let count = 0
      const newArray: IResponseNotifications[] = []
      const oldArray: IResponseNotifications[] = []

      for (const item of data?.data) {
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
  }, [data?.data])

  function writingNotifications() {
    if (data?.data) {
      const notRead: number[] = []
      data?.data?.forEach((item) => {
        if (item.read === false) {
          notRead.push(item.id)
        }
      })
      if (notRead.length > 0) {
        Promise.all([...notRead.map((item) => serviceNotifications.patch({ enabled: true, read: true }, item!))]).then(() => refetch())
      }
    }
  }

  function close() {
    setActive(false)
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
      title={TITLE}
      aria-label={TITLE}
      aria-labelledby={TITLE}
    >
      <div className={cx(`w-6 h-6 relative`, pathname?.includes("/notifications") ? "text-element-accent-1" : "text-text-primary")}>
        <IconSprite id="sprite-nav-header-notification" className="w-6 h-6" />
      </div>
      <span>{TITLE}</span>
      {count ? (
        <div data-count>
          <span>{count > 9 ? "9+" : count}</span>
        </div>
      ) : null}
      <section
        data-active={active}
        onClick={(event) => event.stopPropagation()}
        className={cx(
          "absolute top-[calc(100%_+_0.25rem)] w-[29.5rem] left-0 rounded-2 bg-BG-second overflow-hidden flex flex-col shadow-menu-absolute transition-all",
          active ? "translate-y-0 opacity-100 visible" : "-translate-y-8 invisible opacity-0",
        )}
      >
        {data?.data?.length ? (
          <ul className="w-full max-h-[calc(41.875rem_-_2.5rem)] h-min overflow-x-hidden overflow-y-auto p-6 flex flex-col gap-2.5">
            {state.new.length > 0 ? (
              <>
                <p className="text-text-primary text-base text-left font-medium">Новые уведомления</p>
                {state.new?.map((item) => (
                  <ItemNotification key={`::item::notification::popup::`} {...item} close={close} />
                ))}
              </>
            ) : null}
            {state.old.length > 0 ? (
              <>
                <p className="text-text-primary text-base text-left font-medium">Просмотренные</p>
                {state.old?.map((item) => (
                  <ItemNotification key={`::item::notification::popup::`} {...item} close={close} />
                ))}
              </>
            ) : null}
          </ul>
        ) : (
          <article className="w-full py-2.5 px-[3.125rem] flex flex-col items-center gap-4">
            <h3 className="text-text-primary text-center text-xl font-semibold">У вас пока нет уведомлений</h3>
            <p className="text-text-secondary text-center text-base font-medium">{DESCRIPTION_NOTIFICATIONS_EMPTY.all}</p>
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
