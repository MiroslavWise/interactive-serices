import { type Dispatch } from "react"

import { type IPosts } from "@/services/posts/types"

import ItemComment from "./ItemComment"

import FooterNewComment from "./FooterNewComment"
import IconComment from "@/components/icons/IconComment"
import ComponentNoteInComment from "./ComponentNoteInComment"

import { cx } from "@/lib/cx"
import { useContextPostsComments } from "./ContextComments"
import { getCommentEnding } from "@/helpers/number-of-photos"

function ListCommentsPost({ post, handleToNote }: { post: IPosts; handleToNote: Dispatch<number> }) {
  const { list, isLoading, writeResponse } = useContextPostsComments()

  const filterList = !!writeResponse ? list.filter((item) => item.noteId === writeResponse?.id!) : list

  const titleLength = getCommentEnding(filterList.length)

  return (
    <section className={cx("w-full flex flex-col gap-5 h-full", isLoading && "items-center justify-center")}>
      {!!writeResponse && <ComponentNoteInComment note={writeResponse} />}
      {filterList.length ? (
        <>
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <div className="relative w-5 h-5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
              <IconComment />
            </div>
            <span className="text-text-primary text-sm font-medium">{titleLength}</span>
          </div>
          <ul className="w-full flex flex-col gap-2.5 pb-16 md:pb-20">
            {filterList.map((item) => (
              <ItemComment key={`key:comment:${item.id}:`} comment={item} handleToNote={handleToNote} />
            ))}
          </ul>
        </>
      ) : (
        <section className="flex flex-col gap-2.5 items-center justify-center my-auto">
          <h4 className="text-text-primary text-lg font-semibold text-center">
            Пока нет комментариев{!!writeResponse ? " к данной записи" : ""}
          </h4>
          <p className="text-text-secondary text-center text-sm font-normal">Напишите комментарий первым</p>
        </section>
      )}
      <FooterNewComment post={post} />
    </section>
  )
}

ListCommentsPost.displayName = "ListCommentsPost"
export default ListCommentsPost
