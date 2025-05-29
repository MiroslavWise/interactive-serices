import Link from "next/link"

import { IUserResponse } from "@/services/users/types"

import Avatar from "@avatar"
import ComponentsDotsUser from "./ComponentsDotsUser"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"
import RatingAndFeedbackComponent from "@/components/templates/Friends/components/RatingAndFeedbackComponent"

function ComponentUser(props: IUserResponse) {
  const { profile, id } = props ?? {}

  return (
    <li className="group w-full grid grid-cols-[3.125rem_minmax(0,1fr)] gap-3 p-2 rounded-sm bg-transparent hover:bg-grey-stroke-light transition-colors relative">
      <Avatar className="w-[3.125rem] h-[3.125rem] rounded-md" image={profile?.image} userId={id!} />
      <div className="w-full flex flex-col gap-1 items-start justify-center text-text-primary">
        <Link href={{ pathname: `/customer/${id}` }}>
          {profile?.firstName || "Имя"}&nbsp;
          <span className="relative w-5 h-5 p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[1.125rem] *:h-[1.125rem]">
            <IconVerifiedTick />
          </span>
        </Link>
        <RatingAndFeedbackComponent id={id} />
      </div>
      <ComponentsDotsUser {...props} />
    </li>
  )
}

ComponentUser.displayName = "ComponentUser"
export default ComponentUser
