"use client"

import dayjs from "dayjs"
import Link from "next/link"
import { useQueries } from "@tanstack/react-query"

import { NextImageMotion, Button, GeoTagging } from "@/components/common"

import { useOut } from "@/helpers"
import { getUserId, serviceProfile } from "@/services"
import { useAuth, dispatchNewServicesBanner } from "@/store"

import styles from "./styles/style.module.scss"

export const M_ContainerAboutProfile = () => {
  const { out } = useOut()
  const userId = useAuth(({ userId }) => userId)

  const [{ data }, { data: dataProfile }] = useQueries({
    queries: [
      {
        queryFn: () => getUserId(userId!),
        queryKey: ["user", { userId: userId }],
        enabled: !!userId,
      },
      {
        queryFn: () => serviceProfile.getUserId(userId!),
        queryKey: ["profile", userId!],
        enabled: !!userId,
      },
    ],
  })

  const addressMain = data?.res?.addresses?.find((item) => item?.addressType === "main") || null

  return (
    <section className={styles.containerMAboutProfile}>
      <div className={styles.blockAboutPhoto}>
        <div className={styles.blockPhotoAch}>
          <div className={styles.avatar}>
            <NextImageMotion className={styles.photo} src={dataProfile?.res?.image?.attributes?.url!} alt="avatar" width={94} height={94} />
            {dataProfile?.ok ? <img className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={24} height={24} /> : null}
          </div>
        </div>
        <div className={styles.aboutBlock}>
          <h4>
            {dataProfile?.res?.firstName} {dataProfile?.res?.lastName}
          </h4>
          {addressMain ? <GeoTagging size={16} fontSize={12} location={addressMain?.additional} /> : null}
          <p className={styles.date}>
            На Sheira с {dataProfile?.res?.created ? dayjs(dataProfile?.res?.created).format("DD.MM.YYYY") : null}
          </p>
          <p className={styles.about}>{dataProfile?.res?.about}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          type="button"
          typeButton="fill-primary"
          label="Создать"
          suffixIcon={<img src="/svg/plus.svg" alt="plus" width={24} height={24} />}
          onClick={() => dispatchNewServicesBanner(true)}
        />
        <Link data-circle-gradient href={{ pathname: "/profile-change" }}>
          <img src="/svg/edit-primary-gradient.svg" alt="edit-primary" width={20} height={20} />
        </Link>
        <button data-circle-gradient onClick={out}>
          <img src="/svg/log-out-primary-gradient.svg" alt="log-out" width={20} height={20} />
        </button>
      </div>
    </section>
  )
}
