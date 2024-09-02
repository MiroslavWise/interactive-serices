import { type IPosts } from "@/services/posts/types"
import ComponentDots from "./components/ComponentDots"
import IconPost from "@/components/icons/IconPost"
import GeoData from "./components/GeoData"
import ItemProfile from "../CardBallon/components/ItemProfile"

interface IProps {
  post: IPosts
}

function CardPost({ post }: IProps) {
  const { title, user } = post ?? {}

  return (
    <article className="w-full rounded-2xl border-solid border cursor-pointer flex flex-col gap-3 bg-card-yellow border-card-border-yellow p-4">
      <ComponentDots post={post} />
      <header className="w-full grid grid-cols-[1.625rem_minmax(0,1fr)] gap-3 items-start">
        <div className="relative w-[1.625rem] h-[1.625rem] p-[0.8125rem] *:absolute *:-translate-x-1/2 *:-translate-y-1/2 *:left-1/2 *:top-1/2 *:w-[1.625rem] *:h-[1.625rem]">
          <IconPost />
        </div>
        <h3 className="text-base font-semibold text-text-primary">{title ?? "Заголовок поста"}</h3>
      </header>
      <p className="whitespace-pre-wrap text-text-primary text-sm font-normal">{title}</p>
      <GeoData post={post} />
      <ItemProfile user={user} />
    </article>
  )
}

CardPost.displayName = "CardPost"
export default CardPost
