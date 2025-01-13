import { EnumTypeProvider } from "@/types/enum"
import { INotes } from "@/services/notes/types"
import { type IPosts } from "@/services/posts/types"

import GeoData from "./components/GeoData"
import IconPost from "@/components/icons/IconPost"
import IconNote from "@/components/icons/IconNote"
import ComponentDots from "./components/ComponentDots"
import CommentsCount from "./components/CommentsCount"
import ItemProfile from "../CardBallon/components/ItemProfile"
import ItemImages from "@/components/templates/Balloon/Offer/components/ItemImages"

import { cx } from "@/lib/cx"
import { nameTitle } from "@/lib/names"
import { dispatchBallonPost } from "@/store"
import AdvertisingTitleCompany from "../CardBallon/components/AdvertisingTitleCompany"
import AdvertisingData from "../CardBallon/components/AdvertisingData"
import AdvertButtons from "../AdvertButtons"

interface IProps {
  post: IPosts
  className?: string
}

function replaceImageFiles(notes: INotes[]) {
  const array = []

  const noteMain = notes.find((item) => item.main)?.images ?? []

  for (const item of noteMain) {
    if (item.attributes.mime.includes("image") || item.attributes.mime.includes("video")) {
      array.push(item)
    }
  }

  return array
}
function CardPost({ post, className }: IProps) {
  const { title, user, notes = [], id, company } = post ?? {}

  function handle() {
    dispatchBallonPost(post)
  }

  const description = notes.find((item) => item.main)?.description ?? title
  const replaceImage = replaceImageFiles(notes)

  const isAdvertising = !!company

  if (isAdvertising)
    return (
      <article
        className={cx(
          "w-full border border-solid rounded-2xl cursor-pointer flex flex-col bg-card-yellow gap-3 p-4 border-card-border-yellow border-l-2 border-l-[var(--card-svg-yellow)]",
          className,
        )}
        onClick={handle}
      >
        <ComponentDots post={post} />
        <AdvertisingTitleCompany company={company} post={post} provider={EnumTypeProvider.POST} />
        <p className="whitespace-pre-wrap text-text-primary text-sm font-normal line-clamp-4 text-ellipsis">{description}</p>
        {replaceImage.length > 0 ? <ItemImages images={replaceImage} /> : null}
        <AdvertisingData company={company} />
        <AdvertButtons provider={EnumTypeProvider.POST} post={post} />
      </article>
    )

  return (
    <article
      className={cx(
        "w-full border border-solid rounded-2xl cursor-pointer flex flex-col bg-card-yellow gap-3 p-4 border-card-border-yellow",
        className,
      )}
      onClick={handle}
    >
      {/* <header
        className={cx(
          "[background:var(--more-red-gradient)] w-full py-1.5 px-2.5 flex-row gap-2 items-center justify-center rounded-t-2xl",
          !!urgent ? "flex" : "hidden",
        )}
      >
        <div className="w-4 h-4 relative">
          <IconHelp />
        </div>
        <span className="text-text-button text-xs font-medium">Щедрое сердце</span>
      </header> */}
      <ComponentDots post={post} />
      <header className="w-full grid grid-cols-[1.625rem_minmax(0,1fr)] gap-3 items-start">
        <div className="relative w-[1.625rem] h-[1.625rem] p-[0.8125rem] *:absolute *:-translate-x-1/2 *:-translate-y-1/2 *:left-1/2 *:top-1/2 *:w-[1.625rem] *:h-[1.625rem]">
          <IconPost />
        </div>
        <h3 className="text-base font-semibold text-text-primary text-ellipsis line-clamp-2">{title ?? "Заголовок события"}</h3>
      </header>
      <p className="whitespace-pre-wrap text-text-primary text-sm font-normal line-clamp-4 text-ellipsis">{description}</p>
      {replaceImage.length > 0 ? <ItemImages images={replaceImage} /> : null}
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
      <ItemProfile user={user} provider={EnumTypeProvider.POST} targetId={id!} />
    </article>
  )
}

CardPost.displayName = "CardPost"
export default CardPost
