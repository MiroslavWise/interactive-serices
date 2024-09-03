import { useQuery } from "@tanstack/react-query"

import { type IPosts } from "@/services/posts/types"

import { NextImageMotion } from "@/components/common"
import IconComment from "@/components/icons/IconComment"
import IconEmptyProfile from "@/components/icons/IconEmptyProfile"
import { IconVerifiedTick } from "@/components/icons/IconVerifiedTick"

import { cx } from "@/lib/cx"
import { daysAgo } from "@/helpers"
import { getComments } from "@/services"

function ListCommentsPost({ post }: { post: IPosts }) {
  const { data, isLoading } = useQuery({
    queryFn: () => getComments({}),
    queryKey: ["comments", { provider: "post" }],
  })

  const list = data?.data ?? []

  return (
    <section className={cx("w-full flex flex-col gap-5", isLoading && "items-center justify-center h-full")}>
      {list.length ? (
        <>
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <div className="relative w-5 h-5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
              <IconComment />
            </div>
            <span className="text-text-primary text-sm font-medium">{list.length} комментариев</span>
          </div>
          <ul className="w-full flex flex-col gap-2.5">
            {list.map((item) => (
              <li key={`key:comment:${item.id}:`} className="w-full grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                <div className={cx("w-8 h-8 relative rounded-full overflow-hidden", !item?.user?.image && "bg-grey-stroke-light")}>
                  {!!item?.user?.image ? (
                    <NextImageMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8"
                      src={item?.user?.image?.attributes?.url!}
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <IconEmptyProfile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5" />
                  )}
                </div>
                <article className="w-full flex flex-col gap-0.5 pb-2.5 border-b border-solid border-grey-stroke-light">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-text-primary text-xs font-normal">
                      {item?.user?.firstName || "Имя"} {item?.user?.lastName || "Фамилия"}
                    </p>
                    <div className="relative w-3 h-3 p-1.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-3 *:h-3 *:z-20 -ml-1">
                      <IconVerifiedTick />
                    </div>
                    <time className="text-text-secondary text-xs font-normal" dateTime={item.created}>
                      {daysAgo(item.created)}
                    </time>
                  </div>
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
    </section>
  )
}

ListCommentsPost.displayName = "ListCommentsPost"
export default ListCommentsPost
