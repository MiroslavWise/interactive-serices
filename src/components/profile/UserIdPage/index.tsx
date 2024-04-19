import type { IUserResponse } from "@/services/users/types"

import { MobileMainInfo } from "../MobileMainInfo"
import { Badges } from "@/components/profile/StatisticAndFeedback/components/Budges"
import { MobileInteractive, StatisticAndFeedback, MainInfo } from "@/components/profile"

import { useResize } from "@/helpers"

import styles from "@/scss/page.module.scss"

export const UserIdPage = ({ id, user }: { id: string; user: IUserResponse; ok: boolean; isLoading: boolean }) => {
  const { isTablet } = useResize()

  return isTablet ? (
    <ul className={styles.containerMobile} id="user-id">
      <MobileMainInfo user={user!} />
      <Badges id={id} />
      <MobileInteractive user={user} />
    </ul>
  ) : (
    <section className={styles.container}>
      <MainInfo user={user!} />
      <StatisticAndFeedback id={id} />
    </section>
  )
}
