import { type Dispatch } from "react"

import { IPostsComment } from "@/services/posts-comments"

import Avatar from "@avatar"
import ImageComment from "./ImageComment"
import ItemCommentNote from "./ItemCommentNote"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { daysAgo, useResize } from "@/helpers"
import { dispatchPublicProfile } from "@/store"

interface IProps {
  comment: IPostsComment
  handleToNote: Dispatch<number>
}

function ItemComment({ comment, handleToNote }: IProps) {
  const { isTablet } = useResize()
  const { user, userId, created, note, images, message } = comment ?? {}

  return (
    <li className="w-full grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
      <Avatar className="w-8 h-8 p-4 rounded-full" image={user?.image} userId={userId} />
      <article className="w-full flex flex-col gap-0.5 pb-2.5 border-b border-solid border-grey-stroke-light">
        <div className="flex flex-row items-center gap-2">
          <a
            {...{
              className: "text-text-primary text-xs font-normal cursor-pointer",
              href: isTablet ? `/customer/${userId}` : undefined,
              target: isTablet ? "_blank" : undefined,
              onClick() {
                if (!isTablet) {
                  dispatchPublicProfile(userId)
                }
              },
            }}
          >
            {user?.firstName || "Имя"} {user?.lastName || ""}
          </a>
          <div className="relative w-3 h-3 p-1.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-3 *:h-3 *:z-20 -ml-1">
            <IconVerifiedTick />
          </div>
          <time className="text-text-secondary text-xs font-normal" dateTime={created}>
            {daysAgo(created)}
          </time>
        </div>
        <ItemCommentNote note={note} handleToNote={handleToNote} />
        <p className="text-text-primary text-sm font-normal whitespace-pre-wrap">{message}</p>
        <ImageComment images={images ?? []} />
      </article>
    </li>
  )
}

ItemComment.displayName = "ItemComment"
export default ItemComment
