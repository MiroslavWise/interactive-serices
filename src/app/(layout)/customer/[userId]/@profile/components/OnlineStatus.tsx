"use client"

import { type IUserResponse } from "@/services/users/types"

import { fromNow } from "@/helpers"
import { useOnline } from "@/store"
import { type TGenderForm } from "@/components/templates/UpdateProfile/utils/update-form.schema"

const BE_GENDER: Map<TGenderForm, string> = new Map([
  ["m", "был"],
  ["f", "была"],
])

function OnlineStatus({ user }: { user: IUserResponse }) {
  const { updated, profile, id } = user ?? {}
  const { gender } = profile ?? {}
  const users = useOnline(({ users }) => users)

  const is = users.some((_) => _.id === id)

  if (is)
    return (
      <div className="flex flex-row items-center gap-1.5 justify-start md:justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none" className="w-[7px] h-[7px] -mb-0.5">
          <circle cx="3.5" cy="3.5" r="3.5" fill="#109F5C" />
        </svg>
        <span className="text-[0.8125rem] text-text-primary font-normal leading-4">в сети</span>
      </div>
    )

  return (
    <time className="text-[0.8125rem] leading-4 font-normal text-text-secondary text-center">
      {BE_GENDER.has(gender!) ? BE_GENDER.get(gender!) : "был(а)"} {fromNow(updated || new Date())}
    </time>
  )
}

OnlineStatus.displayName = "OnlineStatus"
export default OnlineStatus
