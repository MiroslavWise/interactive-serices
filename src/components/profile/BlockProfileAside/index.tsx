"use client"

import { useState, type FC } from "react"
import { useQuery } from "react-query"
import dynamic from 'next/dynamic'

import { HeaderBlock } from "./components/HeaderBlock"
import { Badges } from "./components/Badges"
import { ButtonDefault } from "@/components/common/Buttons"

import { usersService } from "@/services/users"
import { useAuth } from "@/store/hooks/useAuth"
import { cx } from "@/lib/cx"

import styles from "./styles/style.module.scss"

export const BlockProfileAside: FC = () => {
  const { userId } = useAuth() ?? {}

  const { data, isLoading } = useQuery(["profile", userId], () => usersService.getUserId(userId!))

  return (
    <>
      <section className={styles.container}>
        <HeaderBlock data={data?.res!} />
        <Badges />
        <ButtonDefault
          label="Редактировать профиль"
          classNames={cx("w-100", styles.largeButton)}
        />
      </section>
    </>
  )
}