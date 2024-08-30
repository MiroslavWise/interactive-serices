import { memo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumProviderThreads, EnumStatusBarter } from "@/types/enum"
import { type IResponseThread } from "@/services/threads/types"

import { getBarterId } from "@/services"
import { formatOfMMMM } from "@/helpers"
import { cx } from "@/lib/cx"

interface IProps {
  thread: IResponseThread
}

function ItemCompletedBarter({ thread }: IProps) {
  const barterId = thread?.provider === EnumProviderThreads.BARTER ? thread?.barterId : null

  const { data, isLoading } = useQuery({
    queryFn: () => getBarterId(barterId!),
    queryKey: ["barters", { id: barterId! }],
    enabled: !!barterId,
  })

  if (!thread || isLoading || data?.data?.status !== EnumStatusBarter.COMPLETED) return null

  const timeCompleted = data?.data?.completed
    ? formatOfMMMM(data?.data?.completed || new Date(), "HH:mm")
    : formatOfMMMM(data?.data?.updated || new Date())

  return (
    <div className="w-full flex flex-col items-center gap-3 mb-3 md:mb-5">
      <article
        className={cx(
          "w-fit min-w-16 px-3 h-[1.6875rem] rounded-[0.84375rem] py-1 items-center justify-center bg-BG-time",
          formatOfMMMM(data?.data?.completed || new Date(), "dd.MM.yy") === formatOfMMMM(data?.data?.created || new Date(), "dd.MM.yy")
            ? "hidden"
            : "flex",
        )}
      >
        <time className="text-text-button text-[0.8125rem] font-normal">
          {formatOfMMMM(data?.data?.completed || data?.data?.updated || new Date(), "dd MMMM")}
        </time>
      </article>
      <article className="w-full md:max-w-[25rem] py-2 px-3 rounded-2xl border border-grey-separator border-solid flex flex-row flex-wrap gap-1 justify-center relative">
        <p className="text-center text-sm text-text-primary">
          Обмен завершен. Вы можете оставить отзыв — это поможет повысить качество обменов и услуг на Sheira.&nbsp;
          <time className="text-text-secondary text-xs font-normal ml-auto opacity-0">{timeCompleted}</time>
          <time className="text-text-secondary text-xs font-normal absolute bottom-2 right-3">{timeCompleted}</time>
        </p>
      </article>
    </div>
  )
}

ItemCompletedBarter.displayName = "ItemCompletedBarter"
export default memo(ItemCompletedBarter)
