"use client"

import { type FC } from "react"
import { useQuery } from "react-query"
import { isMobile } from "react-device-detect"

import { HeaderBlock } from "./components/HeaderBlock"
import { Badges } from "./components/Badges"
import { ButtonDefault } from "@/components/common/Buttons"

import { usersService } from "@/services/users"
import { useAuth } from "@/store/hooks/useAuth"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const BlockProfileAside: FC = () => {
  const { userId } = useAuth()

  const { data, isLoading } = useQuery(["profile", userId], () => usersService.getUserId(userId!))

  return (
    <section className={cx(styles.container, isMobile && styles.mobile)}>
      <HeaderBlock data={data?.res!} />
      {typeof isMobile !== "undefined" && !isMobile ? <Badges /> : null}
      <div className={styles.buttons}>
        <ButtonDefault
          label="Редактировать профиль"
          classNames={cx("w-100", styles.largeButton)}
        />
        {
          isMobile ? (
            <>
              
            </>
          ) : null
        }
      </div>
    </section>
  )
}