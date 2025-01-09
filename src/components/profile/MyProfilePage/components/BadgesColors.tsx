import { useQuery } from "@tanstack/react-query"

import BadgeParnter from "./BadgeParnter"

import { cx } from "@/lib/cx"
import { getTestimonials } from "@/services"

import styles from "./styles/badges-colors.module.scss"

export const BadgesColors = ({ userId }: { userId: number | string }) => {
  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: userId!, order: "DESC" }),
    queryKey: ["testimonials", { receiver: userId, order: "DESC" }],
    enabled: !!userId,
  })

  const list = testimonials?.data ?? []
  const length = list.length
  const rating = (list.reduce((acc, item) => acc + item.rating, 0) / (length || 1)).toFixed(1)

  if (isLoadingTestimonials)
    return (
      <div className="loading-screen w-full grid grid-cols-3 gap-1">
        {["asdfasdfas asdf asdf", "asdfasdzcvo a eho", "asdf"].map((item) => (
          <article
            key={`:load:fsdf:${item}:`}
            className="w-full py-2 px-2.5 flex flex-col gap-2.5 rounded-.625 border border-solid border-grey-stroke-light *:w-full"
          >
            <span className="h-4 rounded-lg" />
            <span className="max-w-[60%] h-[1.375rem] rounded-[0.6875rem]" />
          </article>
        ))}
      </div>
    )

  return (
    <div
      className={cx(
        styles.container,
        "w-full grid grid-cols-3 gap-1 md:gap-2.5",
        "*:h-[4.5rem] *:w-full *:relative *:rounded-xl md:*:rounded-2xl",
      )}
      data-badges-color
    >
      <section data-purple className="rounded-2xl py-2 px-3 overflow-hidden">
        <article className="w-full h-full flex flex-col items-start justify-between">
          <h4 className="text-text-button text-sm font-medium">Отзывы</h4>
          <h2 className="text-text-button text-2xl font-semibold">{length}</h2>
        </article>
        <div data-icon>
          <img src="/badges/message-circle-01.svg" alt="barter" width={24} height={24} />
        </div>
      </section>
      <section data-orange className="rounded-2xl py-2 px-3 overflow-hidden">
        <article className="w-full h-full flex flex-col items-start justify-between">
          <h4 className="text-text-button text-sm font-medium">Рейтинг</h4>
          <h2 className="text-text-button text-2xl font-semibold">{Number(rating)?.toFixed(1)}</h2>
        </article>
        <div data-icon>
          <img src="/badges/star.svg" alt="barter" width={24} height={24} />
        </div>
      </section>
      <BadgeParnter />
    </div>
  )
}
