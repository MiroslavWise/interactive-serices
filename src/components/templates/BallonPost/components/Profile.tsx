import { type IPosts } from "@/services/posts/types"

import { NextImageMotion } from "@/components/common"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"

interface IProps {
  post: IPosts
}

export function ComponentProfilePost({ post }: IProps) {
  const { user, updated, addresses } = post ?? {}

  const { image, firstName, lastName } = user ?? {}
  const firstAddress = addresses[0] ?? {}
  const additional = firstAddress?.additional?.replace(`${firstAddress?.country}, `, "").replace(`${firstAddress?.region}, `, "") ?? ""

  return (
    <div className="relative w-full grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2.5">
      <div className={cx("w-10 h-10 rounded-[0.625rem] !p-5 relative overflow-hidden block", !image ? "bg-grey-stroke-light" : "")}>
        {!!image ? (
          <NextImageMotion
            className="overflow-hidden w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={image?.attributes?.url}
            alt="avatar"
            width={60}
            height={60}
          />
        ) : (
          <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6" />
        )}
      </div>
      <article className="w-full flex flex-col items-start gap-1">
        <div className="flex flex-row flex-nowrap gap-1 items-center">
          <p className="text-sm text-text-primary font-medium">
            {firstName || "Имя"} {lastName || "Фамилия"}
          </p>
          <div></div>
        </div>
        <time dateTime={updated} className="text-text-secondary font-normal text-[0.8125rem] leading-4 -mt-0.5">
          обновлено: {daysAgo(updated || new Date())}
        </time>
        <span className="text-text-secondary font-normal text-[0.8125rem] leading-4 text-ellipsis line-clamp-1">{additional}</span>
      </article>
    </div>
  )
}

ComponentProfilePost.displayName = "ComponentProfilePost"
export default ComponentProfilePost
