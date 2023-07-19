import { Fragment } from "react"


import styles from "@/scss/page.module.scss"
import { MainInfo, StatisticAndFeedback } from "@/components/profile"

export default function ProfileId({
  params
}: {
  params: { id: string | number }
}) {

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <MainInfo />
        <StatisticAndFeedback />
      </section>
    </div>
  )
}