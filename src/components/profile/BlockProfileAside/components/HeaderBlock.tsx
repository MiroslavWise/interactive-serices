import { ru } from "date-fns/locale"
import { useQuery } from "@tanstack/react-query"

import type { THeaderBlock } from "../types/types"

import { NextImageMotion } from "@/components/common"

import { useAuth } from "@/store"
import { getProfile, getUserId } from "@/services"

import styles from "../styles/header.module.scss"
import { format } from "date-fns"

export const HeaderBlock: THeaderBlock = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: dataProfile } = useQuery({
    queryFn: () => getProfile(),
    queryKey: ["profile", userId],
    enabled: !!userId,
  })

  return (
    <header className={styles.containerHeader} data-test="block-profile-aside-header">
      <div className={styles.avatar} data-null-avatar={!!dataProfile?.res?.image?.attributes} data-test="block-profile-aside-avatar-div">
        <NextImageMotion
          className={styles.photo}
          src={dataProfile?.res?.image?.attributes?.url!}
          alt="avatar"
          width={94}
          height={94}
          data-test="block-profile-aside-avatar-img"
        />
        {!!dataProfile?.res?.image?.attributes ? (
          <img className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} />
        ) : null}
      </div>
      <section data-test="block-profile-aside-section-info">
        <h4 data-test="block-profile-aside-section-info-h4">
          {dataProfile?.res?.firstName || "Имя"} {dataProfile?.res?.lastName || "Фамилия"}
        </h4>
        {data?.res?.created ? (
          <time dateTime={`${data?.res?.created!}`} data-test="block-profile-aside-section-info-time">
            На Sheira с {format(data?.res?.created!, "do MMMM yyyy", { locale: ru })}
          </time>
        ) : null}
      </section>
    </header>
  )
}
