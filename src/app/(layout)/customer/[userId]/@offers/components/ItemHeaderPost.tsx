import { type IPosts } from "@/services/posts/types"

import ItemHeaderDotsPost from "./ItemHeaderDotsPost"

import { cx } from "@/lib/cx"
import { fromNow } from "@/helpers"

interface IProps {
  post: IPosts
}

function ItemHeaderPost({ post }: IProps) {
  const { created, updated, archive } = post ?? {}

  return (
    <header className="w-full relative flex flex-row gap-2.5 justify-between">
      <time className="text-text-secondary text-xs font-normal" dateTime={updated ?? created}>
        {fromNow(updated || created || new Date())}
      </time>
      <div
        className={cx(
          "w-fit px-3 py-1 h-6 rounded-xl bg-text-secondary absolute top-1/2 -translate-y-1/2 right-8",
          archive ? "flex items-center justify-center" : "hidden",
        )}
      >
        <span className="text-text-button text-center text-xs font-normal">Завершено</span>
      </div>
      <ItemHeaderDotsPost post={post} />
    </header>
  )
}

ItemHeaderPost.displayName = "ItemHeaderPost"
export default ItemHeaderPost
