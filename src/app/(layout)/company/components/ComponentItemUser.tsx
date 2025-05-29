import Link from "next/link"
import { Dispatch } from "react"

import { IUserOffer } from "@/services/offers/types"

import Avatar from "@avatar"
import { IconSprite } from "@/components/icons/icon-sprite"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"
import RatingAndFeedbackComponent from "@/components/templates/Friends/components/RatingAndFeedbackComponent"

interface IProps {
  user: IUserOffer
  isCustomer?: boolean
  onDelete?: Dispatch<number>
}

function ComponentItemUser({ user, isCustomer, onDelete }: IProps) {
  const { firstName = "Имя", lastName = "", image, id } = user ?? {}

  function handleDelete() {
    if (isCustomer) {
      if (onDelete) {
        onDelete(id)
      }
    }
  }

  return (
    <li className="w-full grid grid-cols-[3.125rem_minmax(0,1fr)_13.0625rem] gap-3 items-center relative">
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
        {isCustomer ? (
          <>
            <button type="button" className="absolute top-0 right-0 w-5 h-5 *:w-4 *:h-4 text-element-accent-2" onClick={handleDelete}>
              <IconSprite id="trash-20-20" />
            </button>
          </>
        ) : null}
      </div>
    </li>
  )
}

ComponentItemUser.displayName = "ComponentItemUser"
export default ComponentItemUser
