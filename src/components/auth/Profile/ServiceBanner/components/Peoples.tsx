"use client"

import { useQuery } from "react-query"

import type { TPeoples } from "./types/types"

import { PeopleCard } from "@/components/common/PeopleCard/ServiceBanner"
import { MotionUL } from "@/components/common/Motion"

import { MOCKS_SERVICES } from "@/mocks/components/auth/constants"
import { usersService } from "@/services/users"

import styles from "./styles/style.module.scss"

export const Peoples: TPeoples = ({ setDataAndActive }) => {
  const { data, isLoading, error } = useQuery(["users"], () => usersService.getUsers({ limit: 20 }))
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
            photo={item?.profile?.image?.attributes?.url ? item?.profile?.image?.attributes?.url : "/public/png/default_avatar.png"}
            name={`${item?.profile?.firstName || "Имя"} ${item?.profile?.lastName || "Фамилия"}`}
            rate={4.5}
            services={MOCKS_SERVICES}
            geo="Ln. Mesa, New Jersey 45463"
            about={item?.profile?.about}
            userId={item.id}
          />
        ))
      }
    </MotionUL>
  )
}