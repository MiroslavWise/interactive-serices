"use client"

import { Button } from "@/components/common"
import { HeaderBlock } from "./components/HeaderBlock"

import { cx } from "@/lib/cx"
import { dispatchModal, EModalData } from "@/store"

export const BlockProfileAside = () => {
  return (
    <section className="flex flex-col items-center gap-5 w-full" data-test="block-profile-aside">
      <HeaderBlock />
      <Button
        type="button"
        label="Редактировать профиль"
        typeButton="regular-primary"
        className="h-9"
        onClick={() => dispatchModal(EModalData.UpdateProfile)}
        data-test="block-profile-aside-button-on-modal-update-profile"
      />
    </section>
  )
}
