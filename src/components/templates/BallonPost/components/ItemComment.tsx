import { useState, type Dispatch } from "react"

import { deletePostsCommentId, IPostsComment } from "@/services/posts-comments"

import Avatar from "@avatar"
import ImageComment from "./ImageComment"
import ItemCommentNote from "./ItemCommentNote"
import Button from "@/components/common/Button"
import { IconSprite } from "@/components/icons/icon-sprite"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { useContextPostsComments } from "./ContextComments"
import { daysAgo, useOutsideClickEvent, useResize } from "@/helpers"
import { dispatchPublicProfile, useAuth, useBalloonPost } from "@/store"

interface IProps {
  comment: IPostsComment
  handleToNote: Dispatch<number>
}

function ItemComment({ comment, handleToNote }: IProps) {
  const [loading, setLoading] = useState(false)
  const { isTablet } = useResize()
  const { refetch } = useContextPostsComments()
  const post = useBalloonPost(({ data }) => data)
  const { userId: postUserId } = post ?? {}
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { user, userId: commentUserId, created, note, images, message, id } = comment ?? {}

  const [open, setOpen, ref] = useOutsideClickEvent()

  async function handleOkDelete() {
    if (!loading) {
      setLoading(true)
      await deletePostsCommentId(id)
      await refetch()
      setLoading(false)
    }
  }

  return (
    <li className={cx("w-full grid grid-cols-[2rem_minmax(0,1fr)] gap-3", open ? "z-50" : "z-0")}>
      <Avatar className="w-8 h-8 p-4 rounded-full" image={user?.image} userId={commentUserId} />
      <article className="w-full flex flex-col gap-0.5 pb-2.5 border-b border-solid border-grey-stroke-light">
        <div className="w-full flex flex-row items-center justify-start gap-2 relative">
          <a
            {...{
              className: "text-text-primary text-xs font-normal cursor-pointer",
              href: isTablet ? `/customer/${commentUserId}` : undefined,
              target: isTablet ? "_blank" : undefined,
              onClick() {
                if (!isTablet) {
                  dispatchPublicProfile(commentUserId)
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
          <div
            className={cx(
              "absolute top-1/2 right-0 -translate-y-1/2",
              !!userId && (userId === postUserId || userId === commentUserId) ? "flex items-center justify-center" : "hidden",
            )}
            ref={ref}
          >
            <button
              type="button"
              className={cx("relative w-5 h-5 *:w-4 *:h-4 text-text-secondary hover:text-text-accent")}
              onClick={(event) => {
                event.stopPropagation()
                setOpen((_) => !_)
              }}
            >
              <IconSprite id="trash-20-20" />
            </button>
            <div
              className={cx(
                "absolute top-[calc(100%_+_0.25rem)] right-0 bg-BG-second shadow-box-down p-3 rounded-xl flex flex-col gap-0.5 w-60",
                open ? "opacity-100 z-50 visible" : "opacity-0 invisible -z-10",
              )}
            >
              <article className="w-full text-center text-text-secondary text-sm font-normal flex flex-col items-center gap-0.5">
                <span>Вы уверены, что хотите удалить этот комментарий?</span>
                <span>
                  После подтверждения он будет <span className="font-semibold text-text-error">безвозвратно удален</span>.
                </span>
              </article>
              <footer className="flex flex-row items-center gap-2">
                <Button type="button" typeButton="fill-primary" label="Да" className="h-9" loading={loading} onClick={handleOkDelete} />
                <Button
                  type="button"
                  typeButton="regular-primary"
                  label="Нет"
                  className="h-9"
                  loading={loading}
                  disabled={loading}
                  onClick={(event) => {
                    event.stopPropagation()
                    setOpen(false)
                  }}
                />
              </footer>
            </div>
          </div>
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
