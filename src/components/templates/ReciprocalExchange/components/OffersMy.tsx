"use client"

import { memo, useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useFormContext } from "react-hook-form"

import { IFormValues, ETypeOfNewCreated } from "../types/types"
import { EnumTypeProvider } from "@/types/enum"

import { ImageCategory } from "@/components/common"
import ItemImages from "@/components/templates/Balloon/Offer/components/ItemImages"

import { useAuth } from "@/store"
import { getOffersCategories, getUserIdOffers } from "@/services"

import styles from "../styles/offers-my.module.scss"

export const OffersMy = memo(({ loading }: IProps) => {
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.res || []
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IFormValues>()

  const { data } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: EnumTypeProvider.offer, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: EnumTypeProvider.offer }],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })

  const offersMy = useMemo(() => {
    if (!data?.res) return []

    return data?.res?.filter((item) => item?.addresses?.length > 0) || []
  }, [data?.res])

  const categoryMyOffer = useCallback((id: number) => categories?.find((item) => item?.id === id!), [categories])

  return (
    <div className={styles.container} {...register("my_offer", { required: watch("select_new_proposal") === ETypeOfNewCreated.their })}>
      {offersMy.length > 0
        ? offersMy?.map((item) => (
            <a
              key={`::${item.id}::my::offer::`}
              data-active={watch("my_offer") === item.id}
              onClick={(event) => {
                if (loading) {
                  return
                }
                event.stopPropagation()
                if (watch("my_offer") !== item.id) {
                  setValue("my_offer", item.id)
                } else {
                  setValue("my_offer", undefined)
                }
              }}
            >
              <div data-category>
                <div data-img>
                  <ImageCategory id={item.id!} />
                </div>
                <span>{categoryMyOffer(item.categoryId!)?.title || ""}</span>
              </div>
              <p>{item.title}</p>
              {item?.images?.length > 0 ? <ItemImages images={item?.images} notTouch /> : null}
            </a>
          ))
        : null}
    </div>
  )
})

interface IProps {
  loading: boolean
}
