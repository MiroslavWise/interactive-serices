"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import type { TContainerSuggestions } from "./types/types"

import ItemOffers from "./ItemOffers"
import { Button } from "@/components/common"

import { cx } from "@/lib/cx"
import { getUserIdOffers } from "@/services"
import { dispatchModal, EModalData, openCreateOffers, useAuth, useProviderProfileOffer } from "@/store"
import IconDiscussionBalloon from "@/components/icons/IconDiscussionBalloon"
import IconAlertCirlceRed from "@/components/icons/IconAlertCirlceRed"
import IconOfferBalloon from "@/components/icons/IconOfferBalloon"

const CN_UL = "w-full h-fit grid grid-cols-3 max-2xl:grid-cols-2 max-xl:grid-cols-1 overflow-y-visible z-10 pb-5 gap-2.5 md:gap-4"

const titleEmpty: Map<EnumTypeProvider, string> = new Map([
  [
    EnumTypeProvider.offer,
    "Начните предлагать услуги и обмениваться ими с жителям Sheira прямо сейчас. Создайте своё предложение и получите услугу в обмен",
  ],
  [
    EnumTypeProvider.discussion,
    "Есть проблема, которую нужно срочно обсудить? Или хотите спросить мнение по какому‑то вопросу? Давайте создадим обсуждение",
  ],
  [
    EnumTypeProvider.alert,
    "Случилось что‑то важное и хотите предупредить других? Или у вас случилась проблема и нужна помощь? Давайте создадим SOS-сообщение",
  ],
])

export const ContainerSuggestions: TContainerSuggestions = () => {
  const stateProvider = useProviderProfileOffer(({ stateProvider }) => stateProvider)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}

  const { data, isLoading } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: stateProvider, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: stateProvider }],
    enabled: !!userId!,
  })

  const items = data?.data || []
  const length = items.length

  const functionAndTitle = useMemo(() => {
    const title: Map<Partial<EnumTypeProvider>, string> = new Map([
      [EnumTypeProvider.offer, "Создать предложение"],
      [EnumTypeProvider.discussion, "Создать обсуждение"],
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

  if (isLoading)
    return (
      <ul className={cx(CN_UL, "loading-screen")}>
        {[1323, 2123, 32312, 5123123, 1234, 35512].map((_) => (
          <li key={`::key::load::${_}::`} className="w-full rounded-2xl bg-BG-second p-4 *:w-full flex flex-col gap-4">
            <span className="max-w-40 h-6 rounded-xl " />
            <span className="rounded-2xl h-[8.9375rem]" />
            <article className="w-full flex flex-col gap-2 *:w-full *:h-6 *:rounded-xl">
              <span className="max-w-[15.375rem]" />
              <span className="max-w-[12.75rem]" />
              <span className="max-w-36" />
            </article>
            <div className="w-full grid grid-cols-[minmax(0,1fr)_2.25rem] gap-3 *:h-9 *:rounded-[1.125rem]">
              <span />
              <span />
            </div>
          </li>
        ))}
      </ul>
    )

  if (length === 0)
    return (
      <section className="w-full h-full rounded-2xl bg-BG-second flex flex-col items-center py-5 md:pt-[4.375rem] px-5 md:mb-6">
        <article className="w-full md:max-w-[25rem] flex flex-col items-center gap-5 md:gap-6">
          <div className="w-full flex flex-col items-center gap-3">
            <div
              className={cx(
                "w-14 h-14 rounded-[1.75rem] bg-grey-field relative p-7",
                "*:w-6 *:h-6 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2",
              )}
            >
              {stateProvider === EnumTypeProvider.discussion ? (
                <IconDiscussionBalloon />
              ) : stateProvider === EnumTypeProvider.alert ? (
                <IconAlertCirlceRed />
              ) : stateProvider === EnumTypeProvider.offer ? (
                <IconOfferBalloon />
              ) : null}
            </div>
            <p className="text-text-primary text-sm font-normal text-center">
              {titleEmpty.has(stateProvider) ? titleEmpty.get(stateProvider) : null}
            </p>
          </div>
          <Button
            className="max-w-[15.625rem]"
            type="button"
            typeButton="fill-primary"
            label={functionAndTitle.title}
            onClick={functionAndTitle.func}
            data-test={`button-profile-container-suggestions-on-create-${stateProvider}`}
          />
        </article>
      </section>
    )

  return (
    <ul className={CN_UL} data-test="profile-container-suggestions">
      {items.map((_) => (
        <ItemOffers key={`::key::${_.id}::${_.provider}::`} offer={_!} />
      ))}
    </ul>
  )
}
