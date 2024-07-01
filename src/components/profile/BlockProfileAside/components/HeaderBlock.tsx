import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useQuery } from "@tanstack/react-query"

import type { THeaderBlock } from "../types/types"

import { NextImageMotion } from "@/components/common"

import { useAuth } from "@/store"
import { getUserId } from "@/services"

import styles from "../styles/header.module.scss"

export const HeaderBlock: THeaderBlock = () => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  const { data: res } = data ?? {}
  const { profile, created } = res ?? {}
  const { image, firstName, lastName } = profile ?? {}

  return (
    <header className={styles.containerHeader} data-test="block-profile-aside-header">
      <div className={styles.avatar} data-null-avatar={!!image?.attributes} data-test="block-profile-aside-avatar-div">
        <NextImageMotion
          className={styles.photo}
          src={image?.attributes?.url!}
          alt="avatar"
          width={94}
          height={94}
          data-test="block-profile-aside-avatar-img"
        />
        {!!image?.attributes ? <img className={styles.verified} src="/svg/verified-tick.svg" alt="tick" width={32} height={32} /> : null}
      </div>
      <section data-test="block-profile-aside-section-info">
        <h4 data-test="block-profile-aside-section-info-h4">
          {firstName || "Имя"} {lastName || "Фамилия"}
        </h4>
        {created ? (
          <time dateTime={`${created!}`} data-test="block-profile-aside-section-info-time">
            На Sheira с {format(created!, "do MMMM yyyy", { locale: ru })}
          </time>
        ) : null}
      </section>
    </header>
  )
}
