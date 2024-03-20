import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { THeaderBlock } from "../types/types"

import { NextImageMotion } from "@/components/common"

import { useAuth } from "@/store"
import { getProfileUserId, getUserId } from "@/services"

import styles from "../styles/header.module.scss"
import { dayFormat } from "@/helpers"

export const HeaderBlock: THeaderBlock = () => {
  const userId = useAuth(({ userId }) => userId)

  const { data } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: dataProfile } = useQuery({
    queryFn: () => getProfileUserId(userId!),
    queryKey: ["profile", userId],
    enabled: !!userId,
  })

  const addressMain = useMemo(() => {
    if (!data?.res) return null

    const main = data?.res?.addresses?.find((item) => item?.addressType === "main")

    // city
    // street
    // house

    if (main) {
      const house = main?.house ?? ""
      const street = main?.street ?? ""
      const city = main?.city ?? ""

      const address = [city, street, house].filter(Boolean).join(", ")

      return address
    }

    return null
  }, [data?.res])

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
        {addressMain ? <p>{addressMain}</p> : null}
        {data?.res?.created ? (
          <time dateTime={`${data?.res?.created!}`}>На Sheira с {dayFormat(data?.res?.created!, "dd.MM.yyyy")}</time>
        ) : null}
      </section>
    </header>
  )
}
