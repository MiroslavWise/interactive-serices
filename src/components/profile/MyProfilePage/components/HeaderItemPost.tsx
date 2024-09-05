import { type IPosts } from "@/services/posts/types"

import IconPost from "@/components/icons/IconPost"
import HeaderItemDotsPost from "./HeaderItemDotsPost"

import { cx } from "@/lib/cx"

interface IProps {
  post: IPosts
}

function HeaderItemPost({ post }: IProps) {
  const { archive, title } = post ?? {}
  return (
    <header className="w-full flex flex-col gap-3">
      <article className={cx("w-full", archive ? "flex flex-row items-center gap-5 justify-between" : "hidden")}>
        <div className="py-1 px-3 h-6 rounded-xl w-fit bg-text-secondary flex items-center justify-center">
          <span className="text-text-button text-xs text-center">Завершено</span>
        </div>
        {archive && <HeaderItemDotsPost post={post} />}
      </article>
      <article
        className={cx("w-full grid gap-3", archive ? "grid-cols-[1.625rem_minmax(0,1fr)]" : "grid-cols-[1.625rem_minmax(0,1fr)_1.5rem]")}
      >
        <div className="relative h-[1.625rem] w-[1.625rem] p-[0.8125rem] *:absolute *:-translate-x-1/2 *:-translate-y-1/2 *:left-1/2 *:top-1/2 *:w-[1.625rem] *:h-[1.625rem]">
          <IconPost />
        </div>
        <h3 className="text-text-primary line-clamp-2 text-ellipsis text-base font-semibold">{title}</h3>
        {!archive && <HeaderItemDotsPost post={post} />}
      </article>
    </header>
  )
}

export default HeaderItemPost
