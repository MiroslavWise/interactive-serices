import { useQuery } from "@tanstack/react-query"

import { getBarters, getTestimonials } from "@/services"

import styles from "./styles/badges-colors.module.scss"
import { useMemo } from "react"

export const BadgesColors = ({ userId }: { userId: number | string }) => {
  const { data: dataBarters } = useQuery({
    queryFn: () => getBarters({ user: userId!, status: "completed", order: "DESC" }),
    queryKey: ["barters", { userId: userId, status: "completed" }],
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
    <div className={styles.container}>
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
