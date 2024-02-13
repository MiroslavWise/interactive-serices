"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import type { TContainerSuggestions } from "./types/types"
import type { TTypeProvider } from "@/services/file-upload/types"

import { Button, LoadingMyOffer, PersonalAccountCardOffer } from "@/components/common"
import { CardDiscussion } from "@/components/common/Card"

import { getUserIdOffers } from "@/services"
import { openCreateOffers, useAuth, useProviderProfileOffer } from "@/store"

import styles from "./styles/style.module.scss"

const titleEmpty: Map<TTypeProvider, string> = new Map([
  ["offer", "У вас нет опубликованных предложений на карте."],
  ["discussion", "У вас нет опубликованных дискуссий на карте."],
  ["alert", "У вас нет опубликованных SOS-сообщений на карте."],
])

export const ContainerSuggestions: TContainerSuggestions = () => {
  const stateProvider = useProviderProfileOffer(({ stateProvider }) => stateProvider)
  const userId = useAuth(({ userId }) => userId)

  const { data, refetch, isLoading } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: stateProvider, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: stateProvider }],
    enabled: !!userId!,
  })

  const functionAndTitle = useMemo(() => {
    const title: Map<Partial<TTypeProvider>, string> = new Map([
      ["offer", "Создать предложение"],
      ["discussion", "Создать дискуссию"],
      ["alert", "Создать SOS"],
    ])

    return {
      title: title.get(stateProvider)!,
      func: () => openCreateOffers(stateProvider),
    }
  }, [stateProvider])

  return (
    <ul className={styles.containerSuggestions} data-loading={isLoading} data-length={data?.res?.length === 0}>
      {isLoading ? (
        [1, 2, 3, 4].map((item) => <LoadingMyOffer key={`::item::my::offer::loading::${item}::`} />)
      ) : data?.res && Array.isArray(data?.res) && ["offer"].includes(stateProvider) && data?.res?.length > 0 ? (
        data?.res
          ?.filter((item) => item?.addresses?.length > 0)
          .map((item, index) => <PersonalAccountCardOffer key={`${item.id}+${index}-${stateProvider}`} offer={item!} refetch={refetch} />)
      ) : data?.res && Array.isArray(data?.res) && ["discussion", "alert"].includes(stateProvider) && data?.res?.length > 0 ? (
        data?.res.map((item) => <CardDiscussion key={`${item.id}-${item.provider}`} {...item} />)
      ) : (
        <article>
          <h3>{titleEmpty.has(stateProvider) ? titleEmpty.get(stateProvider) : null}</h3>
          <Button type="button" typeButton="fill-primary" label={functionAndTitle?.title} onClick={functionAndTitle?.func} />
        </article>
      )}
    </ul>
  )
}
