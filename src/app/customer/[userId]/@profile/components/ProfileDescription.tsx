"use client"

import { type IUserResponse } from "@/services/users/types"

import { dispatchOpenCustomerAbout } from "@/store"

function ProfileDescription({ user }: { user: IUserResponse }) {
  const {
    profile: { about },
  } = user ?? {}

  return (
    <a
      className="text-text-primary line-clamp-3 text-ellipsis font-normal cursor-pointer"
      title={about}
      aria-label={about}
      aria-labelledby={about}
      onClick={dispatchOpenCustomerAbout}
    >
      {about}
    </a>
  )
}

ProfileDescription.displayName = "ProfileDescription"
export default ProfileDescription
