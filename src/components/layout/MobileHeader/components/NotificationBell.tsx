"use client"

import { serviceNotifications } from "@/services"
import { dispatchVisibleNotifications, useAuth } from "@/store"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const NotificationBell = () => {
  const [count, setCount] = useState<number | null>(null)
  const isAuth = useAuth(({ isAuth }) => isAuth)
  const { id } = useAuth(({ auth }) => auth) ?? {}
  const { data: dataNotifications } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: id }],
    enabled: !!id,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (dataNotifications?.res && dataNotifications?.res?.length > 0) {
      let count = 0
      for (const item of dataNotifications?.res) {
        if (!item.read) {
          count += 1
        }
      }
      setCount(count || null)
    }
  }, [dataNotifications?.res])

  return !!isAuth ? (
    <button
      data-notifications
      onClick={(event) => {
        event.stopPropagation()
        dispatchVisibleNotifications(true)
      }}
      className="relative z-10 w-6 h-6 bg-transparent border-none outline-none flex items-center justify-center"
      data-test="button-header-mobile-notification"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.22775 3.22703C8.49362 1.96116 10.2105 1.25 12.0007 1.25C13.7909 1.25 15.5078 1.96116 16.7737 3.22703C18.0396 4.4929 18.7507 6.20979 18.7507 8C18.7507 10.9571 19.4946 12.9344 20.2878 14.2092L20.2968 14.2235C20.6565 14.8016 20.9372 15.2528 21.1255 15.5795C21.2198 15.7431 21.3019 15.8943 21.3612 16.0248C21.3908 16.09 21.4218 16.1653 21.4454 16.2446C21.4654 16.3119 21.4998 16.4441 21.4869 16.6019C21.4766 16.7273 21.4524 16.9183 21.3443 17.1129C21.2362 17.3075 21.0868 17.429 20.9858 17.5039C20.7868 17.6516 20.5518 17.6868 20.46 17.7004C20.3261 17.7202 20.1695 17.7307 20.0035 17.7371C19.6731 17.75 19.213 17.75 18.6311 17.75H5.37038C4.78841 17.75 4.3283 17.75 3.99799 17.7371C3.83196 17.7307 3.67536 17.7202 3.54145 17.7004C3.44968 17.6868 3.21467 17.6516 3.01567 17.5039C2.91463 17.429 2.76524 17.3075 2.65715 17.1129C2.54907 16.9183 2.5248 16.7273 2.51454 16.6019C2.50164 16.4441 2.536 16.3119 2.55603 16.2446C2.57965 16.1653 2.61063 16.09 2.64023 16.0248C2.69951 15.8943 2.78161 15.7431 2.87591 15.5795C3.06421 15.2528 3.34488 14.8017 3.7045 14.2238L3.7136 14.2092C4.50684 12.9344 5.25072 10.9571 5.25072 8C5.25072 6.20979 5.96188 4.4929 7.22775 3.22703ZM12.0007 2.75C10.6083 2.75 9.27298 3.30312 8.28841 4.28769C7.30385 5.27226 6.75072 6.60761 6.75072 8C6.75072 11.2233 5.93555 13.4775 4.98717 15.0016C4.65018 15.5432 4.39875 15.9475 4.22507 16.2434C4.50991 16.2499 4.89033 16.25 5.38958 16.25H18.6119C19.1111 16.25 19.4915 16.2499 19.7764 16.2434C19.6027 15.9475 19.3513 15.5432 19.0143 15.0017C18.0659 13.4775 17.2507 11.2233 17.2507 8C17.2507 6.60761 16.6976 5.27225 15.713 4.28769C14.7285 3.30312 13.3931 2.75 12.0007 2.75ZM20.2587 16.2136C20.2693 16.2105 20.2759 16.2096 20.2759 16.2096C20.2759 16.2096 20.271 16.2113 20.2587 16.2136ZM3.72559 16.2096C3.72559 16.2096 3.73216 16.2105 3.74274 16.2136C3.73045 16.2113 3.72559 16.2096 3.72559 16.2096ZM8.79259 20.5037C9.06669 20.1931 9.54065 20.1636 9.8512 20.4377C10.4246 20.9438 11.176 21.25 12.0007 21.25C12.8255 21.25 13.5769 20.9438 14.1502 20.4377C14.4608 20.1636 14.9348 20.1931 15.2089 20.5037C15.483 20.8143 15.4534 21.2882 15.1428 21.5623C14.306 22.301 13.2049 22.75 12.0007 22.75C10.7966 22.75 9.69549 22.301 8.8586 21.5623C8.54805 21.2882 8.5185 20.8143 8.79259 20.5037Z"
          fill="var(--element-accent-2)"
        />
      </svg>
      {count ? (
        <div className="absolute -right-2 -top-2 z-20 h-[1.1875rem] min-w-[1.1875rem] pl-1.5 pr-[0.4375rem] pt-1 pb-[0.3125rem] bg-element-accent-1 flex items-center justify-center rounded-[0.59375rem]">
          <span className="text-text-button text-center text-[0.625rem] leading-[0.625rem] font-bold">{count > 9 ? "9+" : count}</span>
        </div>
      ) : null}
    </button>
  ) : null
}
