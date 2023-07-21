"use client"

import { useQuery } from "react-query"

import { MainInfo, StatisticAndFeedback } from "@/components/profile"

import { usersService } from "@/services/users"

import styles from "@/scss/page.module.scss"

export default function ProfileId({
  params
}: {
  params: { id: string | number }
}) {
  const { data, isLoading } = useQuery(["userId", params.id], () => usersService.getUserId(params.id))

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <MainInfo user={data?.res!} />
        <StatisticAndFeedback />
      </section>
    </div>
  )
}