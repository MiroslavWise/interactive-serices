import Link from "next/link"

import type { ICommentsResponse } from "@/services/comments/types"

import Avatar from "@avatar"
import IconVerifiedTick from "@/components/icons/IconVerifiedTick"

import { daysAgo } from "@/helpers"

export const ItemComment = (props: ICommentsResponse) => {
  const { message, created, user } = props ?? {}

  const { image, firstName, lastName } = user ?? {}

  return (
    <div className="w-full grid grid-cols-[2rem_minmax(0,1fr)] gap-3 items-start justify-start px-5">
      <Avatar className="rounded-full w-8 h-8 p-4" image={image} userId={user?.id} />
      <div className="w-full flex flex-col">
        <Link
          className="flex flex-row items-center flex-nowrap text-text-primary font-normal text-xs text-left w-full whitespace-nowrap text-ellipsis line-clamp-1"
          href={{ pathname: `/customer/${user?.id}` }}
          target="_blank"
        >
          {firstName || "Имя"} {lastName || ""}&nbsp;
          <div className="relative w-3 h-4 px-1.5 py-2 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-3 *:h-3 *:z-20">
            <IconVerifiedTick />
          </div>
          &nbsp;<time className="text-text-disabled">{daysAgo(created!)}</time>
        </Link>
        <p className="text-text-primary text-sm text-left whitespace-pre-wrap">{message || ""}</p>
        <article className="w-full pt-2.5 border-b border-solid border-grey-stroke-light" />
      </div>
    </div>
  )
}
