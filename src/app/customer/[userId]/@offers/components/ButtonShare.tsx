"use client"

import { IResponseOffers } from "@/services/offers/types"

import { IconDotsHorizontal } from "@/components/icons/IconDotsHorizontal"

import { useOutsideClickEvent } from "@/helpers"

function ButtonShare({ offer }: { offer: IResponseOffers }) {
  const [open, setOpen, ref] = useOutsideClickEvent()

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="w-4 h-4 relative border-none outline-none [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-4 [&>svg]:h-4"
        onClick={(event) => {
          event.stopPropagation()
          setOpen(true)
        }}
      >
        <IconDotsHorizontal />
      </button>
    </>
  )
}

ButtonShare.displayName = "ButtonShare"
export default ButtonShare
