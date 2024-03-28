"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import type { THeaderMobile } from "./types"

import { SearchElementMap } from "@/components/common"

import { useAuth } from "@/store"
import { useResize } from "@/helpers"
import { serviceNotifications } from "@/services"

import styles from "./styles/style.module.scss"

export const Header: THeaderMobile = ({ handleAddressLocation }) => {
  const userId = useAuth(({ userId }) => userId)
  const [count, setCount] = useState<number | null>(null)
  const { isTablet } = useResize()
  const { data: dataNotifications } = useQuery({
    queryFn: () => serviceNotifications.get({ order: "DESC" }),
    queryKey: ["notifications", { userId: userId }],
    enabled: !!userId && isTablet,
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

  return !isTablet ? (
    <div
      id="headerRef"
      className={styles.containerSearchTop}
      style={{
        top: `6.3125rem`,
      }}
    >
      <SearchElementMap handleAddressLocation={handleAddressLocation} />
    </div>
  ) : null
}
