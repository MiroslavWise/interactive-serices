"use client"

import { dispatchOnboarding } from "@/store"

export const BannerStartCreate = () => {
  return (
    <div
      className="fixed bg-text-accent overflow-hidden h-12 w-12 rounded-full flex items-center justify-center cursor-pointer left-5 bottom-[calc(var(--height-mobile-footer-nav)_+_1rem)]"
      onClick={(event) => {
        event.stopPropagation()
        dispatchOnboarding("open")
      }}
    >
      <h3 className="text-text-button text-xl text-center font-semibold">?</h3>
    </div>
  )
}
