import { EnumTypeProvider } from "@/types/enum"
import { type TNewCreateBadge } from "../types/types"

import IconCircleQuestion from "@/components/icons/IconCircleQuestion"

import {
  useModal,
  EModalData,
  dispatchModal,
  useOnboarding,
  openCreateOffers,
  dispatchCreatePost,
  dispatchOnboarding,
  dispatchCreatePostMap,
  useNewServicesBannerMap,
} from "@/store"
import { cx } from "@/lib/cx"
import { mapIconCreateOffer } from "@/utils"

const NewCreateBadge: TNewCreateBadge = ({ value, label, assistance }) => {
  const state = useModal(({ data }) => data)
  const type = useOnboarding(({ type }) => type)
  const visible = useOnboarding(({ visible }) => visible)
  const init = useNewServicesBannerMap(({ addressInit }) => addressInit)

  function handleType() {
    if (value === EnumTypeProvider.POST) {
      if (!!init) {
        dispatchCreatePostMap(init)
      } else {
        dispatchCreatePost(true)
      }
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
    <li className="relative w-full grid grid-cols-[1fr_1.5rem] gap-4 items-center max-w-full md:max-w-[22.5rem]">
      <button
        className={cx(
          "group relative z-0 text-text-primary hover:!text-text-button flex flex-row items-center justify-center gap-4 h-14 w-full rounded-[1.75rem] bg-BG-second cursor-pointer border border-solid border-grey-stroke-light hover:border-element-accent-1 hover:bg-element-accent-1 focus:border-element-accent-1 focus:bg-element-accent-1",
          visible && type === value && "bg-element-accent-1",
          visible && type !== value && "cursor-default",
          "[&>svg]:w-8 [&>svg]:h-8",
        )}
        onClick={handleType}
        id={`li-${value}-create`}
      >
        {mapIconCreateOffer.has(value) ? mapIconCreateOffer.get(value) : null}
        <p className="text-current text-base font-medium">{label}</p>
      </button>
      <button
        type="button"
        className="relative w-6 h-6 [&>article]:hover:z-50 [&>article]:hover:visible [&>article]:hover:opacity-100 [&>article]:hover:translate-x-0 transition-transform"
        onClick={(event) => event.stopPropagation()}
      >
        <IconCircleQuestion />
        <article className="leading-3 absolute right-7 top-1/2 -translate-y-1/2 translate-x-6 py-1 px-2 rounded-md transition-all -z-10 invisible opacity-0 w-max max-w-56 bg-BG-second shadow-menu-absolute border border-solid border-grey-stroke-light">
          <span className="text-xs font-normal text-text-primary">{assistance}</span>
        </article>
      </button>
    </li>
  )
}

NewCreateBadge.displayName = "NewCreateBadge"
export default NewCreateBadge
