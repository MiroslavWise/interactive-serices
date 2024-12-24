"use client"

import { EnumTypeProvider } from "@/types/enum"

import NewCreateBadge from "./components/NewCreateBadge"
import { ArticleOnboarding } from "@/components/templates"
import IconMapTransparent from "@/components/icons/IconMapTransparent"

import { NEW_CREATE_BADGES } from "./constants"
import { EModalData, useModal, useNewServicesBannerMap, useOnboarding } from "@/store"

function NewServicesBanner() {
  const step = useOnboarding(({ step }) => step)
  const type = useOnboarding(({ type }) => type)
  const visible = useOnboarding(({ visible }) => visible)

  const state = useModal(({ data }) => data)
  const init = useNewServicesBannerMap(({ addressInit }) => addressInit)

  return (
    <>
      <h3 className="text-[var(--text-primary)] text-lg md:text-2xl font-semibold text-center">Я хочу создать</h3>
      <ul className="h-full w-full flex flex-col gap-4 items-center overflow-y-auto md:overflow-hidden">
        {state === EModalData.NewServicesBannerMap && init ? (
          <article className="w-full max-w-full md:max-w-[22.5rem] p-4 flex flex-col gap-1.5 items-start bg-[var(--grey-field)] rounded-2xl mb-1 md:mb-3.5">
            <div className="flex flex-row items-center gap-2.5 w-full">
              <div className="w-6 h-6 rounded-xl p-1 flex items-center justify-center *:w-4 *:h-4 bg-[var(--element-accent-2)]">
                <IconMapTransparent />
              </div>
              <h4 className="text-[var(--text-primary)] text-sm font-semibold">по адресу</h4>
            </div>
            <p className="text-[var(--text-primary)] text-sm font-normal">{init?.additional}</p>
          </article>
        ) : null}
        <NewCreateBadge {...NEW_CREATE_BADGES[0]} />
        {visible && step === 1 && type === EnumTypeProvider.offer && <ArticleOnboarding />}
        <NewCreateBadge {...NEW_CREATE_BADGES[1]} />
        {visible && step === 1 && type === EnumTypeProvider.alert && <ArticleOnboarding />}
        <NewCreateBadge {...NEW_CREATE_BADGES[2]} />
      </ul>
    </>
  )
}

NewServicesBanner.displayName = "NewServicesBanner"
export default NewServicesBanner
