import { type Dispatch } from "react"

import { type IPosts } from "@/services/posts/types"

import Avatar from "@avatar"
import ItemCommentNote from "./ItemCommentNote"
import FooterNewComment from "./FooterNewComment"
import IconComment from "@/components/icons/IconComment"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { daysAgo, useResize } from "@/helpers"
import { dispatchPublicProfile } from "@/store"
import { useContextPostsComments } from "./ContextComments"

function ListCommentsPost({ post, handleToNote }: { post: IPosts; handleToNote: Dispatch<number> }) {
  const { isTablet } = useResize()
  const { list, isLoading } = useContextPostsComments()

  return (
    <section className={cx("w-full flex flex-col gap-5 h-full", isLoading && "items-center justify-center")}>
      {list.length ? (
        <>
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <div className="relative w-5 h-5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
              <IconComment />
            </div>
            <span className="text-text-primary text-sm font-medium">{list.length} комментариев</span>
          </div>
          <ul className="w-full flex flex-col gap-2.5 pb-16 md:pb-20">
            {list.map((item) => (
              <li key={`key:comment:${item.id}:`} className="w-full grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                <Avatar className="w-8 h-8 p-4 rounded-full" image={item?.user?.image} userId={item?.userId} />
                <article className="w-full flex flex-col gap-0.5 pb-2.5 border-b border-solid border-grey-stroke-light">
                  <div className="flex flex-row items-center gap-2">
                    <a
                      {...{
                        className: "text-text-primary text-xs font-normal",
                        href: isTablet ? `/customer/${item?.userId}` : undefined,
                        target: isTablet ? "_blank" : undefined,
                        onClick() {
                          if (!isTablet) {
                            dispatchPublicProfile(item?.userId)
                          }
                        },
                      }}
                    >
                      {item?.user?.firstName || "Имя"} {item?.user?.lastName || ""}
                    </a>
                    <div className="relative w-3 h-3 p-1.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-3 *:h-3 *:z-20 -ml-1">
                      <IconVerifiedTick />
                    </div>
                    <time className="text-text-secondary text-xs font-normal" dateTime={item.created}>
                      {daysAgo(item.created)}
                    </time>
                  </div>
                  <ItemCommentNote note={item?.note} handleToNote={handleToNote} />
                  <p className="text-text-primary text-sm font-normal whitespace-pre-wrap">{item.message}</p>
                </article>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <section className="flex flex-col gap-2.5 items-center justify-center my-auto">
          <h4 className="text-text-primary text-lg font-semibold text-center">Пока нет комментариев</h4>
          <p className="text-text-secondary text-center text-sm font-normal">Напишите комментарий первым</p>
        </section>
      )}
      <FooterNewComment post={post} />
    </section>
  )
}

ListCommentsPost.displayName = "ListCommentsPost"
export default ListCommentsPost
