import { useQuery } from "@tanstack/react-query"

import { type IPosts } from "@/services/posts/types"

import Avatar from "@avatar"
import SharedDotsPost from "./Shared"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { getNotes } from "@/services/notes"
import { daysAgo, getMillisecond } from "@/helpers"
import { clg } from "@console"

interface IProps {
  post: IPosts
}

export function ComponentProfilePost({ post }: IProps) {
  const { user, updated, addresses, userId, id } = post ?? {}

  const { data } = useQuery({
    queryFn: () => getNotes({ order: "DESC", post: id! }),
    queryKey: ["notes", { order: "DESC", postId: id }],
    enabled: !!id,
  })

  const { image, firstName = "Имя", lastName = "" } = user ?? {}
  const firstAddress = addresses[0] ?? {}
  const additional = firstAddress?.additional?.replace(`${firstAddress?.country}, `, "").replace(`${firstAddress?.region}, `, "") ?? ""

  const notes = data?.data || []
  const updatedNotes = notes.map((item) => item.updated || item.created).sort((a, b) => getMillisecond(b) - getMillisecond(a))
  const up = updatedNotes[0] ?? updated

  return (
    <div className="relative w-full grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2.5">
      <Avatar className="w-10 h-10 rounded-.625 p-5" image={image} userId={userId} />
      <article className="w-full flex flex-col items-start gap-1">
        <div className="flex flex-row flex-nowrap gap-1 items-center">
          <p className="text-sm text-text-primary font-medium">
            {firstName} {lastName}
          </p>
          <div className="relative w-4 h-4 p-2 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 *:z-20">
            <IconVerifiedTick />
          </div>
        </div>
        <time dateTime={up} className="text-text-secondary font-normal text-[0.8125rem] leading-4 -mt-0.5">
          обновлено: {daysAgo(up || new Date())}
        </time>
        <span className="text-text-secondary font-normal text-[0.8125rem] leading-4 text-ellipsis line-clamp-1">{additional}</span>
      </article>
      <SharedDotsPost post={post} />
    </div>
  )
}

ComponentProfilePost.displayName = "ComponentProfilePost"
export default ComponentProfilePost
