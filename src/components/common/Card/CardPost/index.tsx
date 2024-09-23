import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"

import GeoData from "./components/GeoData"
import IconPost from "@/components/icons/IconPost"
import IconNote from "@/components/icons/IconNote"
import IconHelp from "@/components/icons/IconHelp"
import ComponentDots from "./components/ComponentDots"
import CommentsCount from "./components/CommentsCount"
import ItemProfile from "../CardBallon/components/ItemProfile"

import { cx } from "@/lib/cx"
import { nameTitle } from "@/lib/names"
import { dispatchBallonPost } from "@/store"

interface IProps {
  post: IPosts
  ref?: any
  dataIndex?: number
}

function CardPost({ post, dataIndex, ref }: IProps) {
  const { title, user, notes = [], id, urgent } = post ?? {}

  function handle() {
    dispatchBallonPost(post)
  }

  const description = notes.find((item) => item.main)?.description ?? title

  return (
    <article className="w-full rounded-2xl cursor-pointer flex flex-col bg-card-yellow" onClick={handle} data-index={dataIndex} ref={ref}>
      <header
        className={cx(
          "[background:var(--more-red-gradient)] w-full py-1.5 px-2.5 flex-row gap-2 items-center justify-center rounded-t-2xl",
          !!urgent ? "flex" : "hidden",
        )}
      >
        <div className="w-4 h-4 relative">
          <IconHelp />
        </div>
        <span className="text-text-button text-xs font-medium">Помощь Курску</span>
      </header>
      <section
        className={cx(
          "flex flex-col gap-3 p-4 w-full border-solid border-card-border-yellow",
          !!urgent ? "border-l border-r border-b rounded-b-2xl" : "border rounded-2xl",
        )}
      >
        <ComponentDots post={post} />
        <header className="w-full grid grid-cols-[1.625rem_minmax(0,1fr)] gap-3 items-start">
          <div className="relative w-[1.625rem] h-[1.625rem] p-[0.8125rem] *:absolute *:-translate-x-1/2 *:-translate-y-1/2 *:left-1/2 *:top-1/2 *:w-[1.625rem] *:h-[1.625rem]">
            <IconPost />
          </div>
          <h3 className="text-base font-semibold text-text-primary text-ellipsis line-clamp-2">{title ?? "Заголовок поста"}</h3>
        </header>
        <p className="whitespace-pre-wrap text-text-primary text-sm font-normal line-clamp-4 text-ellipsis">{description}</p>
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
      </section>
    </article>
  )
}

CardPost.displayName = "CardPost"
export default CardPost
