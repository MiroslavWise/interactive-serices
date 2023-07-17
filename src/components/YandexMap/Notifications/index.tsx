"use client"

import { useSwipeable } from "react-swipeable"

import type { TNotifications } from "./types"
//MOCKS
import { VALUE_CARD_PEOPLES } from "@/mocks/components/YandexMap/constants"
//
import { cx } from "@/lib/cx"
import { PeopleCard } from "@/components/common/PeopleCard/Notifications"

import styles from "./styles/style.module.scss"

export const Notifications: TNotifications = ({ visibleNotification, setVisibleNotification }) => {
  const handlers = useSwipeable({
    touchEventOptions: { passive: false },
    preventScrollOnSwipe: false,
    onSwipedDown: (eventData) => {
      eventData.event.preventDefault()
      eventData.event.stopPropagation()
      setVisibleNotification(false)
    },
  })

  return (
    <div className={cx(styles.container, visibleNotification && styles.visible)}>
      <div className={styles.swipeHeader} {...handlers} />
      <div className={styles.rectangle} />
      <ul>
        {
          VALUE_CARD_PEOPLES?.map(item => (
            <PeopleCard
              key={`${item?.avatar}_${item?.name}`}
              {...item}
            />
          ))
        }
      </ul>
    </div>
  )
}