"use client"

import IconArrowRight from "@/components/icons/IconArrowRight"

import { dispatchOpenFriends } from "@/store"

function ButtonFriends({ id }: { id: number }) {
  return (
    <button
      type="button"
      onClick={() => dispatchOpenFriends(id)}
      className="w-5 h-5 relative p-2.5 border-none outline-none bg-transparent*:h-5*:w-5*:absolute*:top-1/2*:left-1/2*:-translate-x-1/2*:-translate-y-1/2"
    >
      <IconArrowRight />
    </button>
  )
}

ButtonFriends.displayName = "ButtonFriends"
export default ButtonFriends
