import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { cx } from "@/lib/cx"
import { getBarters, getTestimonials } from "@/services"

import styles from "./styles/badges-colors.module.scss"

export const BadgesColors = ({ userId }: { userId: number | string }) => {
  const { data: dataBarters, isLoading: isLoadingBarters } = useQuery({
    queryFn: () => getBarters({ user: userId!, status: EnumStatusBarter.COMPLETED, order: "DESC" }),
    queryKey: ["barters", { userId: userId, status: EnumStatusBarter.COMPLETED }],
    enabled: !!userId,
  })

  const countBarters = dataBarters?.data?.length || 0

  const { data: dataTestimonials, isLoading: isLoadingTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: userId!, order: "DESC" }),
    queryKey: ["testimonials", { receiver: userId, order: "DESC" }],
    enabled: !!userId,
  })

  const countTestimonials = useMemo(() => {
    const length = dataTestimonials?.data?.length || 0
    let sum = 0

    dataTestimonials?.data?.forEach((item) => {
      if (item) {
        sum += item?.rating
      }
    })

    return sum / length || 0
  }, [dataTestimonials?.data])

  if (isLoadingTestimonials || isLoadingBarters)
    return (
      <div className="loading-screen w-full grid grid-cols-3 gap-1">
        {["asdfasdfas asdf asdf", "asdfasdzcvo a eho", "asdfaksdfh qwehr "].map((item) => (
          <article
            key={`:load:fsdf:${item}:`}
            className="w-full py-2 px-2.5 flex flex-col gap-2.5 rounded-[0.625rem] border border-solid border-grey-stroke-light *:w-full"
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
      <section data-purple>
        <article>
          <h4>Обмены</h4>
          <h2>{countBarters}</h2>
        </article>
        <div data-icon>
          <img src="/badges/barter.svg" alt="barter" width={24} height={24} />
        </div>
      </section>
      <section data-orange>
        <article>
          <h4>Рейтинг</h4>
          <h2>{Number(countTestimonials)?.toFixed(1)}</h2>
        </article>
        <div data-icon>
          <img src="/badges/star.svg" alt="barter" width={24} height={24} />
        </div>
      </section>
      <section data-red>
        <article>
          <h4>Баллы</h4>
          <h2>200</h2>
        </article>
        <div data-icon>
          <img src="/badges/gift.svg" alt="barter" width={24} height={24} />
        </div>
      </section>
    </div>
  )
}
