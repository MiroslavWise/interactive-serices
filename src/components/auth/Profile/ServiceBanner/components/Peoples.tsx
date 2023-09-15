"use client"

import { useQuery } from "react-query"

import type { TPeoples } from "./types/types"

import { PeopleCard } from "@/components/common/PeopleCard/ServiceBanner"
import { MotionUL } from "@/components/common/Motion"

import { MOCKS_SERVICES } from "@/mocks/components/auth/constants"
import { profileService } from "@/services/profile"

import styles from "./styles/style.module.scss"

export const Peoples: TPeoples = ({ setDataAndActive }) => {
  const { data, isLoading, error } = useQuery(["profiles"], () => profileService.getProfiles({ limit: 20 }))
  const { res, ok } = data ?? {}

  return (
    <MotionUL classNames={[styles.peoples]}>
      {
        ok
        &&
        res?.map(item => (
          <PeopleCard
            key={`${item.id}_peoples`}
            setDataProfile={setDataAndActive}
            photo={item?.image?.attributes?.url}
            name={`${item?.firstName || "Имя"} ${item?.lastName || "Фамилия"}`}
            rate={4.5}
            services={MOCKS_SERVICES}
            geo="Владимирский спуск, 15, Владимир"
            about={item?.about}
            userId={item.userId}
          />
        ))
      }
    </MotionUL>
  )
}