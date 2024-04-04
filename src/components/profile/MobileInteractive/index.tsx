"use client"

import { useState, useEffect } from "react"

import type { IUserResponse } from "@/services/users/types"
import type { TItemInteractive } from "../StatisticAndFeedback/types/types"
import type { ISegmentValues } from "@/components/common/Segments/types"

import { Segments } from "@/components/common/Segments"
import { ItemsReviews } from "../StatisticAndFeedback/components/ItemsReviews"
import { ContainerServices } from "../StatisticAndFeedback/components/ContainerServices"

import { cx } from "@/lib/cx"
import { dispatchComplaintModalUser, dispatchModal, EModalData } from "@/store"
import { ITEMS_INTERACTIVE } from "../StatisticAndFeedback/components/constants"

import styles from "./style.module.scss"

export const MobileInteractive = ({ user }: { user: IUserResponse }) => {
  const [active, setActive] = useState<ISegmentValues<TItemInteractive>>(ITEMS_INTERACTIVE[0])
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const userIdElement = document.getElementById("user-id")
    const liContainer = document.getElementById("li-container")
    const handleScroll = () => {
      if (liContainer) {
        const offset = liContainer.getBoundingClientRect().top
        setIsSticky(offset <= 25)
      }
    }

    userIdElement?.addEventListener("scroll", handleScroll)

    return () => userIdElement?.removeEventListener("scroll", handleScroll)
  }, [])

  function handle() {
    if (user) {
      dispatchComplaintModalUser({
        user: user,
      })
      dispatchModal(EModalData.ComplaintModal)
      return
    }
  }

  return (
    <li className={styles.containerInteractive}>
      <Segments
        VALUES={ITEMS_INTERACTIVE}
        active={active}
        setActive={setActive}
        type="primary"
        classNames={cx(styles.segments, isSticky && styles.sticky)}
        id="li-container"
        isBorder
      />
      {active.value === "reviews" ? <ItemsReviews /> : active.value === "services" ? <ContainerServices /> : null}
      <footer>
        <a data-complaint onClick={handle}>
          Пожаловаться
        </a>
      </footer>
    </li>
  )
}
