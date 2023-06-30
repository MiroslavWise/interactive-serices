"use client"

import { isMobile } from "react-device-detect"
import { useSwipeable } from "react-swipeable"

import type { TNotifications } from "./types"
//MOCKS
import { VALUE_CARD_PEOPLES } from "@/mocks/components/YandexMap/constants"
//
import styles from "./styles/style.module.scss"
import { PeopleCard } from "@/components/common/PeopleCard/Notifications"

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
    isMobile ? (
      <div className={`${styles.container} ${visibleNotification ? styles.visible : ""}`} >
        <div className={styles.swipeHeader} {...handlers}/>
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
    ) : null
  )
}