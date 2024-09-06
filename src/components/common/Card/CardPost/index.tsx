import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"

import GeoData from "./components/GeoData"
import IconPost from "@/components/icons/IconPost"
import IconNote from "@/components/icons/IconNote"
import ComponentDots from "./components/ComponentDots"
import CommentsCount from "./components/CommentsCount"
import ItemProfile from "../CardBallon/components/ItemProfile"

import { nameTitle } from "@/lib/names"
import { dispatchBallonPost } from "@/store"

interface IProps {
  post: IPosts
  ref?: any
  dataIndex?: number
}

function CardPost({ post, dataIndex, ref }: IProps) {
  const { title, user, notes = [], id } = post ?? {}

  function handle() {
    dispatchBallonPost(post)
  }

  const description = notes.find((item) => item.main)?.description ?? title

  return (
    <article
      className="w-full rounded-2xl border-solid border cursor-pointer flex flex-col gap-3 bg-card-yellow border-card-border-yellow p-4"
      onClick={handle}
      data-index={dataIndex}
      ref={ref}
    >
      <ComponentDots post={post} />
      <header className="w-full grid grid-cols-[1.625rem_minmax(0,1fr)] gap-3 items-start">
        <div className="relative w-[1.625rem] h-[1.625rem] p-[0.8125rem] *:absolute *:-translate-x-1/2 *:-translate-y-1/2 *:left-1/2 *:top-1/2 *:w-[1.625rem] *:h-[1.625rem]">
          <IconPost />
        </div>
        <h3 className="text-base font-semibold text-text-primary text-ellipsis line-clamp-2">{title ?? "Заголовок поста"}</h3>
      </header>
      <p className="whitespace-pre-wrap text-text-primary text-sm font-normal">{description}</p>
      <div className="w-full flex flex-row items-center justify-start gap-2.5 *:h-[1.875rem] *:rounded-[0.9375rem]">
        <div className="px-2.5 w-fit bg-[var(--card-bg-yellow)] py-[0.3125rem] gap-1 grid grid-cols-[1.25rem_minmax(0,1fr)] items-center">
          <div className="w-5 h-5 relative p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 *:scale-90">
            <IconNote />
          </div>
          <span className="text-text-primary text-xs font-medium whitespace-nowrap">
            {notes?.length || 0} {nameTitle(notes?.length, EnumTypeProvider.NOTE)}
          </span>
        </div>
        <CommentsCount id={id!} />
      </div>
      <GeoData post={post} />
      <ItemProfile user={user} />
    </article>
  )
}

CardPost.displayName = "CardPost"
export default CardPost
