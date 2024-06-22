"use client"

import { type IUserResponse } from "@/services/users/types"

function FriendsButtons({ user }: { user: IUserResponse }) {
  return <div className="w-full grid grid-cols-[minmax(0,1fr)_2.25rem] gap-0.625 max-md:hidden"></div>
}

FriendsButtons.displayName = "FriendsButtons"
export default FriendsButtons
