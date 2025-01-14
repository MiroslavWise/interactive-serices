"use client"

import { useQuery } from "@tanstack/react-query"

import { LoadingFeedback } from "@/components/common"
import IconFeedBackAccent from "@/components/icons/IconFeedBackAccent"
import ItemFeedBack from "@/app/(layout)/customer/[userId]/@feedback/components/ItemFeedBack"

import { cx } from "@/lib/cx"
import { useAuth } from "@/store"
import { getTestimonials } from "@/services"

import styles from "./style.module.scss"

export const HistoryExchangeOffers = () => {
  const { id } = useAuth(({ auth }) => auth) ?? {}

  const { data, isLoading } = useQuery({
    queryFn: () => getTestimonials({ receiver: id, order: "DESC" }),
    queryKey: ["testimonials", { receiver: id, order: "DESC" }],
    enabled: !!id,
  })

  const items = data?.data ?? []
  const length = items.length

  return (
    <aside
      className={cx(
        "fixed w-full max-w-[24.375rem] hidden md:flex flex-col gap-6 bg-BG-second z-[2] overflow-hidden rounded-2 right-6 bottom-6 pt-5 px-5",
        styles.default,
      )}
    >
      <header className="w-full">
        <h3 className="text-text-primary text-center text-base font-semibold pb-2.5 border-b border-solid border-grey-stroke-light">
          Отзывы
        </h3>
      </header>
      {isLoading ? (
        <LoadingFeedback />
      ) : length === 0 ? (
        <section className="w-full h-full flex flex-col items-center justify-center my-auto gap-2.5">
          <div className="w-14 h-14 bg-grey-field rounded-[1.75rem] p-4 flex items-center justify-center *:w-6 *:h-6">
            <IconFeedBackAccent />
          </div>
          <p className="text-text-primary text-sm font-normal">Нет отзывов</p>
        </section>
      ) : (
        items.map((_) => <ItemFeedBack key={`:dv:cv:bv:-df-${_.id}`} {..._} />)
      )}
    </aside>
  )
}
