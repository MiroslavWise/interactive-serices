import Link from "next/link"

import { IUserOffer } from "@/services/offers/types"

import Avatar from "@avatar"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"
import RatingAndFeedbackComponent from "@/components/templates/Friends/components/RatingAndFeedbackComponent"

function ComponentItemUser({ user }: { user: IUserOffer }) {
  const { firstName = "Имя", lastName = "", image, id } = user ?? {}

  return (
    <li className="w-full grid grid-cols-[3.125rem_minmax(0,1fr)_13.0625rem] gap-3 items-center">
      <Avatar className="w-[3.125rem] h-[3.125rem] aspect-square rounded-.625" image={image} />
      <div className="w-full flex flex-col items-start justify-center gap-1">
        <Link
          prefetch={false}
          href={{ pathname: `/customer/${id}` }}
          className="w-full text-base text-left font-medium line-clamp-1 flex flex-row flex-nowrap gap-1 text-ellipsis cursor-pointer items-center"
          target="_blank"
        >
          {firstName} {lastName}
          <span className="relative w-5 h-5 p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-[1.125rem] *:h-[1.125rem]">
            <IconVerifiedTick />
          </span>
        </Link>
        <RatingAndFeedbackComponent id={id} />
      </div>
    </li>
  )
}

ComponentItemUser.displayName = "ComponentItemUser"
export default ComponentItemUser
