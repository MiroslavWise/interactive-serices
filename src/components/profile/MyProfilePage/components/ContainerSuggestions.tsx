"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import type { TContainerSuggestions } from "./types/types"

import { Button, LoadingMyOffer } from "@/components/common"

import { getUserIdOffers } from "@/services"
import { dispatchModal, dispatchOnboardingStart, EModalData, openCreateOffers, useAuth, useProviderProfileOffer } from "@/store"

import styles from "./styles/style.module.scss"
import ItemOffers from "./ItemOffers"

const titleEmpty: Map<EnumTypeProvider, string> = new Map([
  [EnumTypeProvider.offer, "У вас нет опубликованных предложений на карте."],
  [EnumTypeProvider.discussion, "У вас нет опубликованных дискуссий на карте."],
  [EnumTypeProvider.alert, "У вас нет опубликованных SOS-сообщений на карте."],
])
const titleEmptyNull: Map<EnumTypeProvider, string> = new Map([
  [
    EnumTypeProvider.offer,
    "Создайте своё первое предложение вместе с обучающим гидом. Мы вам поможем заполнить форму и разместить своё предложение на карте",
  ],
  [
    EnumTypeProvider.discussion,
    "Создайте свою первую дискуссию вместе с обучающим гидом. Мы вам поможем заполнить форму и разместить свою дискуссию на карте",
  ],
  [
    EnumTypeProvider.alert,
    "Создайте своё первое SOS-сообщение вместе с обучающим гидом. Мы вам поможем заполнить форму и разместить своё SOS-сообщение на карте",
  ],
])

export const ContainerSuggestions: TContainerSuggestions = () => {
  const stateProvider = useProviderProfileOffer(({ stateProvider }) => stateProvider)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data: dataOffersAll } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { order: "DESC" }),
    queryKey: ["offers", { userId: userId }],
    enabled: !!userId,
  })

  const length = dataOffersAll?.data?.length || 0

  const { data, isLoading } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: stateProvider, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: stateProvider }],
    enabled: !!userId!,
  })

  const functionAndTitle = useMemo(() => {
    const title: Map<Partial<EnumTypeProvider>, string> = new Map([
      [EnumTypeProvider.offer, "Создать предложение"],
      [EnumTypeProvider.discussion, "Создать дискуссию"],
      [EnumTypeProvider.alert, "Создать SOS"],
    ])

    return {
      title: title.get(stateProvider)!,
      func: () => {
        openCreateOffers(stateProvider)
        dispatchModal(EModalData.CreateNewOptionModal)
      },
    }
  }, [stateProvider])

  const functionCreateFirst = useMemo(() => {
    const label: Map<Partial<EnumTypeProvider>, string> = new Map([
      [EnumTypeProvider.offer, "Создать предложение с гидом"],
      [EnumTypeProvider.discussion, "Создать дискуссию с гидом"],
      [EnumTypeProvider.alert, "Создать SOS с гидом"],
    ])

    return {
      label: label.get(stateProvider),
      func: () => {
        dispatchOnboardingStart(stateProvider)
        dispatchModal(EModalData.CreateNewOptionModal)
      },
    }
  }, [stateProvider])

  return (
    <ul
      className={styles.containerSuggestions}
      data-loading={isLoading}
      data-length={data?.data?.length === 0}
      data-test="profile-container-suggestions"
    >
      {isLoading ? (
        [1, 2, 3, 4].map((item) => <LoadingMyOffer key={`::item::my::offer::loading::${item}::`} />)
      ) : data?.data && Array.isArray(data?.data) && data?.data?.length > 0 ? (
        data.data.map((item, index) => <ItemOffers key={`${item.id}+${index}-${stateProvider}`} offer={item!} />)
      ) : (
        <article data-empty-null={length === 0}>
          <h3>
            {length === 0 && titleEmptyNull.has(stateProvider)
              ? titleEmptyNull.get(stateProvider)
              : titleEmpty.has(stateProvider)
              ? titleEmpty.get(stateProvider)
              : null}
          </h3>
          <Button
            type="button"
            typeButton="fill-primary"
            label={length === 0 ? functionCreateFirst.label : functionAndTitle?.title}
            onClick={length === 0 ? functionCreateFirst.func : functionAndTitle?.func}
            data-test={`button-profile-container-suggestions-on-create-${stateProvider}`}
          />
        </article>
      )}
    </ul>
  )
}
