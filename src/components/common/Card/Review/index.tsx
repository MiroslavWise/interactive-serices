"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import type { TCardReview } from "./types"

import { Rate } from "@/components/common/Rate"

import { serviceProfile } from "@/services"

import styles from "./style.module.scss"
import { dayFormat } from "@/helpers"

export const CardReview: TCardReview = (props) => {
  const { id, userId, rating, message, updated } = props

  const { data } = useQuery({
    queryFn: () => serviceProfile.getUserId(userId!),
    queryKey: ["profile", userId],
    enabled: !!id && !!userId,
  })

  return (
    <li className={styles.container}>
      <div className={styles.content}>
        <header>
          <div className={styles.userDate}>
            <Link href={{ pathname: "/user", query: { id: userId } }}>@{data?.res?.username}</Link>
            <time>{dayFormat(updated, "dd.MM.yyyy")}</time>
          </div>
          <Rate rate={rating} />
        </header>
        <p className={styles.description}>{message}</p>
      </div>
    </li>
  )
}
