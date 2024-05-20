"use client"

import { EnumTypeProvider } from "@/types/enum"

import { NewCreateBadge } from "./components/NewCreateBadge"

import { NEW_CREATE_BADGES } from "./constants"
import { EModalData, useModal, useNewServicesBannerMap, useOnboarding } from "@/store"

import { ArticleOnboarding } from "@/components/templates"

export default function NewServicesBanner() {
  const step = useOnboarding(({ step }) => step)
  const type = useOnboarding(({ type }) => type)
  const visible = useOnboarding(({ visible }) => visible)

  const state = useModal(({ data }) => data)
  const init = useNewServicesBannerMap(({ addressInit }) => addressInit)

  return (
    <>
      <h3>Я хочу создать</h3>
      <ul>
        <NewCreateBadge {...NEW_CREATE_BADGES[0]} />
        {visible && step === 1 && type === EnumTypeProvider.offer && <ArticleOnboarding />}
        <NewCreateBadge {...NEW_CREATE_BADGES[1]} />
        {visible && step === 1 && type === EnumTypeProvider.alert && <ArticleOnboarding />}
        <NewCreateBadge {...NEW_CREATE_BADGES[2]} />
        {visible && step === 1 && type === EnumTypeProvider.discussion && <ArticleOnboarding />}
      </ul>
      {state === EModalData.NewServicesBannerMap && init ? (
        <h4>
          По адресу: <i>{init?.additional}</i>
        </h4>
      ) : null}
    </>
  )
}
