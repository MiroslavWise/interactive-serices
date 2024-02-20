import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { EnumStatusBarter } from "@/types/enum"

import { getBarters, getTestimonials } from "@/services"

import styles from "./styles/badges-colors.module.scss"

export const BadgesColors = ({ userId }: { userId: number | string }) => {
  const { data: dataBarters } = useQuery({
    queryFn: () => getBarters({ user: userId!, status: EnumStatusBarter.COMPLETED, order: "DESC" }),
    queryKey: ["barters", { userId: userId, status: EnumStatusBarter.COMPLETED }],
    enabled: !!userId,
  })

  const countBarters = dataBarters?.res?.length || 0

  const { data: dataTestimonials } = useQuery({
    queryFn: () => getTestimonials({ receiver: userId! }),
    queryKey: ["testimonials", { receiver: userId }],
    enabled: !!userId,
  })

  const countTestimonials = useMemo(() => {
    const length = dataTestimonials?.res?.length || 0
    let sum = 0

    dataTestimonials?.res?.forEach((item) => {
      if (item) {
        sum += item?.rating
      }
    })

    return sum / length || 0
  }, [dataTestimonials?.res])

  return (
    <div className={styles.container} data-badges-color>
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
          <h2>{countTestimonials}</h2>
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
