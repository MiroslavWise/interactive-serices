"use client"

import Image from "next/image"
import { useQuery } from "react-query"

import type { TNotifications } from "./types"

import { MotionUL } from "@/components/common/Motion"
import { PeopleCard } from "@/components/common/PeopleCard/Notifications"

import { cx } from "@/lib/cx"

import { usersService } from "@/services/users"

import styles from "./styles/style.module.scss"
import { Glasses } from "./components/Glasses"

export const Notifications: TNotifications = ({ visibleNotification, setVisibleNotification }) => {
  const { data, isLoading, error } = useQuery(["users"], () => usersService.getUsers({ limit: 20 }))
  const { res, ok } = data ?? {}

  return (
    <div className={cx(styles.container, visibleNotification && styles.visible)}>
      <header className={styles.header}>
        <h4>Предложения</h4>
        <div className={styles.closeArrowDown} onClick={() => setVisibleNotification(false)}>
          <Image
            src="/svg/chevron-down.svg"
            alt="arrow-down"
            width={24}
            height={24}
          />
        </div>
      </header>
      <MotionUL>
        {
          ok
          &&
          res?.map(item => (
            <PeopleCard
              key={`${item.id}_prof_notifications_${item.created}`}
              avatar={item?.profile?.image?.attributes?.url}
              name={`${item?.profile?.firstName} ${item?.profile?.lastName}`}
              date="03/02/2023"
              rate={4.5}
              description={item?.profile?.about}
              path={`/user/${item.id}`}
            />
          ))
        }
      </MotionUL>
      <Glasses />
    </div>
  )
}