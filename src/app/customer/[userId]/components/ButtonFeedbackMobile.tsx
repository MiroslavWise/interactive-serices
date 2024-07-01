"use client"

import IconArrowRight from "@/components/icons/IconArrowRight"

import { dispatchVisibleFeedbackMobileCustomer } from "@/store"

function ButtonFeedbackMobile() {
  return (
    <button
      type="button"
      className="w-5 h-5 relative p-0.625 border-none outline-none bg-transparent [&>svg]:h-5 [&>svg]:w-5 [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2"
      onClick={() => {
        dispatchVisibleFeedbackMobileCustomer(true)
      }}
    >
      <IconArrowRight />
    </button>
  )
}

ButtonFeedbackMobile.displayName = "ButtonFeedbackMobile"
export default ButtonFeedbackMobile
