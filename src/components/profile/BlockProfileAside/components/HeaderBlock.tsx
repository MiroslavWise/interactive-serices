import dayjs from "dayjs"
import { useQuery } from "@tanstack/react-query"

import type { THeaderBlock } from "./types/types"

import { NextImageMotion } from "@/components/common"

import { useAuth } from "@/store"
import { getUserId, serviceProfile } from "@/services"

import styles from "./styles/style.module.scss"

export const HeaderBlock: THeaderBlock = () => {
  const userId = useAuth(({ userId }) => userId)

  const { data } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: dataProfile } = useQuery({
    queryFn: () => serviceProfile.getUserId(userId!),
    queryKey: ["profile", userId],
    enabled: !!userId,
  })

  const addressMain = data?.res?.addresses?.find((item) => item?.addressType === "main") || ""

  return (
    <header className={styles.containerHeader}>
      <div className={styles.avatar} data-null-avatar={!!dataProfile?.res?.image?.attributes}>
        <NextImageMotion className={styles.photo} src={dataProfile?.res?.image?.attributes?.url!} alt="avatar" width={94} height={94} />
        {!!dataProfile?.res?.image?.attributes ? (
          <img className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} />
        ) : null}
      </div>
      <section>
        <h4>
          {dataProfile?.res?.firstName || "Имя"} {dataProfile?.res?.lastName || "Фамилия"}
        </h4>
        {addressMain ? <p>{addressMain?.additional}</p> : null}
        {data?.res?.created ? (
          <time dateTime={`${data?.res?.created!}`}>На Sheira с {dayjs(data?.res?.created!).format("DD.MM.YYYY")}</time>
        ) : null}
      </section>
    </header>
  )
}
