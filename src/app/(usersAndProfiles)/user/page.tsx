"use client"

import { isMobile } from "react-device-detect"
import { useSearchParams } from "next/navigation"

import { MainInfo, StatisticAndFeedback } from "@/components/profile"
import { MotionUL } from "@/components/common/Motion"
import { MobileMainInfo } from "@/components/profile/MobileMainInfo"
import { MobileInteractive } from "@/components/profile/MobileInteractive"

import { profileService } from "@/services/profile"
import { cx } from "@/lib/cx"

import styles from "@/scss/page.module.scss"

async function getDataProfile(id: number) {
  const res = profileService.getProfileThroughUserId(id)

  return await res
}

export default async function UserId() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const data = await getDataProfile(Number(id!))

  return (
    <div className={cx(styles.page, isMobile && styles.mobile)}>
      {
        isMobile ? (
          <MotionUL classNames={[styles.containerMobile]}>
            <MobileMainInfo
              name={`${data?.res?.firstName} ${data?.res?.lastName}`}
              photo={data?.res?.image?.attributes?.url!}
              about={data?.res?.about!}
            />
            <MobileInteractive />
          </MotionUL>
        ) : (
          <section className={styles.container}>
            <MainInfo profile={data?.res!} />
            <StatisticAndFeedback />
          </section>
        )
      }
    </div>
  )
}