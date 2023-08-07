"use client"

import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import { MainInfo, StatisticAndFeedback } from "@/components/profile"
import { MotionUL } from "@/components/common/Motion"
import { MobileMainInfo } from "@/components/profile/MobileMainInfo"
import { MobileInteractive } from "@/components/profile/MobileInteractive"

import { usersService } from "@/services/users"
import { cx } from "@/lib/cx"

import styles from "@/scss/page.module.scss"

export default function UserId({ params }: { params: { id: string | number } }) {
  const { data, isLoading } = useQuery(["userId", params.id], () => usersService.getUserId(params.id))

  if(isLoading) return null

  return (
    <div className={cx(styles.page, isMobile && styles.mobile)}>
      {
        isMobile ? (
          <MotionUL classNames={[styles.containerMobile]}>
            <MobileMainInfo
              name={`${data?.res?.profile?.firstName} ${data?.res?.profile?.lastName}`}
              photo={data?.res?.profile?.image?.attributes?.url!}
              about={data?.res?.profile?.about!}
            />
            <MobileInteractive />
          </MotionUL>
        ) : (
          <section className={styles.container}>
            <MainInfo user={data?.res!} />
            <StatisticAndFeedback />
          </section>
        )
      }
    </div>
  )
}