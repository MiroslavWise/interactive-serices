import { EnumTypeProvider } from "@/types/enum"
import type { TNewCreateBadge } from "../types/types"

import { mapIconCreateOffer } from "@/utils"

import { useOnboarding, dispatchOnboarding, openCreateOffers, dispatchModal, EModalData, useModal, dispatchCreatePost } from "@/store"

const NewCreateBadge: TNewCreateBadge = ({ value, label }) => {
  const type = useOnboarding(({ type }) => type)
  const visible = useOnboarding(({ visible }) => visible)
  const state = useModal(({ data }) => data)

  function handleType() {
    if (value === EnumTypeProvider.post) {
      dispatchCreatePost(true)
      return
    }
    if (visible && type === value) {
      dispatchOnboarding("next")
      openCreateOffers(value as EnumTypeProvider)
      dispatchModal(EModalData.CreateNewOptionModal)
    } else if (visible && type !== value) {
      return
    } else {
      openCreateOffers(value as EnumTypeProvider)
      if (state === EModalData.NewServicesBannerMap) {
        dispatchModal(EModalData.CreateNewOptionModalMap)
      } else {
        dispatchModal(EModalData.CreateNewOptionModal)
      }
    }
  }

  return (
    <li
      className={`group text-text-primary hover:!text-text-button flex flex-row items-center justify-center gap-4 h-14 w-full rounded-[1.75rem] max-w-full md:max-w-[22.5rem] bg-BG-second cursor-pointer z-[2] border border-solid border-grey-stroke-light hover:border-element-accent-1 hover:bg-element-accent-1 focus:border-element-accent-1 focus:bg-element-accent-1) ${
        visible && type === value && "bg-element-accent-1"
      } ${visible && type !== value && "cursor-default"}
      [&>svg]:w-8 [&>svg]:h-8
      ${[EnumTypeProvider.offer, EnumTypeProvider.discussion].includes(value)}
        `}
      onClick={handleType}
      id={`li-${value}-create`}
    >
      {mapIconCreateOffer.has(value) ? mapIconCreateOffer.get(value) : null}
      <p className="text-current text-base font-medium">{label}</p>
    </li>
  )
}

NewCreateBadge.displayName = "NewCreateBadge"
export default NewCreateBadge
