import type { ICommentsResponse } from "@/services/comments/types"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"

export const ItemComment = (props: ICommentsResponse) => {
  const { message, created, user } = props ?? {}

  const { image, firstName, lastName } = user ?? {}

  return (
    <div className="w-full grid grid-cols-[2rem_minmax(0,1fr)] gap-3 items-start justify-start px-5">
      <div className={cx("relative rounded-full overflow-hidden cursor-pointer w-8 h-8", !image && "bg-grey-stroke-light")}>
        {!!image ? (
          <NextImageMotion
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8"
            src={image?.attributes?.url!}
            alt="avatar"
            width={40}
            height={40}
          />
        ) : (
          <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5" />
        )}
      </div>
      <div className="w-full flex flex-col">
        <h5 className="flex flex-row items-center flex-nowrap text-text-primary font-normal text-xs text-left w-full whitespace-nowrap text-ellipsis line-clamp-1">
          {firstName || " "} {lastName || " "}&nbsp;
          <div className="relative w-3 h-4 px-1.5 py-2 [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:-translate-x-1/2 [&>svg]:-translate-y-1/2 [&>svg]:w-3 [&>svg]:h-3 [&>svg]:z-20">
            <IconVerifiedTick />
          </div>
          &nbsp;<time className="text-text-disabled">{daysAgo(created!)}</time>
        </h5>
        <p className="text-text-primary text-sm text-left whitespace-pre-wrap">{message || ""}</p>
        <article className="w-full pt-2.5 border-b border-solid border-grey-stroke-light" />
      </div>
    </div>
  )
}
