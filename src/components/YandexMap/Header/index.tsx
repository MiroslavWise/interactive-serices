"use client"

import { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import { useQuery } from "@tanstack/react-query"

import type { THeaderMobile } from "./types"

import { SearchElementMap } from "@/components/common"

import { serviceNotifications } from "@/services"
import { useAuth } from "@/store"

import styles from "./styles/style.module.scss"

export const Header: THeaderMobile = ({ handleAddressLocation }) => {
  const token = useAuth(({ token }) => token)
  const userId = useAuth(({ userId }) => userId)
  const [count, setCount] = useState<number | null>(null)
  const { data: dataNotifications } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: userId }],
    enabled: !!userId && isMobile,
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

  return isMobile ? null : (
    // <motion.div
    //   className={styles.header}
    //   initial={{ top: -100, opacity: 0, visibility: "hidden" }}
    //   animate={{ top: 0, opacity: 1, visibility: "visible" }}
    //   transition={{ duration: 0.5 }}
    //   exit={{ top: -100, opacity: 0, visibility: "hidden" }}
    // >
    //   <div className={styles.container}>
    //     <div className={styles.logoAndNotifications}>
    //       <img src="/logo/wordmark.svg" alt="logo" width={107} height={28.3} />
    //       {!!token ? (
    //         <div className={styles.containerNotification} onClick={() => dispatchVisibleNotifications(true)}>
    //           <img src="/svg/bell.svg" alt="bell" width={22} height={22} />
    //           {count ? (
    //             <div className={styles.badge}>
    //               <span>{count > 9 ? "9+" : count}</span>
    //             </div>
    //           ) : null}
    //         </div>
    //       ) : (
    //         <div data-not />
    //       )}
    //     </div>
    //     <div className={styles.segments}>
    //       <SearchElementMap handleAddressLocation={handleAddressLocation} />
    //     </div>
    //   </div>
    // </motion.div>
    <div
      id="headerRef"
      className={styles.containerSearchTop}
      style={{
        top: `6.3125rem`,
      }}
    >
      <SearchElementMap handleAddressLocation={handleAddressLocation} />
    </div>
  )
}
