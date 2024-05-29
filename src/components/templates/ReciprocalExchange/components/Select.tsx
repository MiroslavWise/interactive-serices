"use client"

import { memo, useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { ETypeOfNewCreated, IFormValues } from "../types/types"

import { OffersMy } from "./OffersMy"
import { NewCreateOffer } from "./NewCreateOffer"
import { CategoriesWants } from "./CategoriesWants"

import { useAuth_ } from "@/store"
import { getUserIdOffers } from "@/services"
import { SELECT_NEW_PROPOSAL } from "../constants/select"
import { IResponseOffersCategories } from "@/services/offers-categories/types"

import styles from "../styles/choose-an-offer.module.scss"

export const ChooseAnOffer = memo(({ loading, firstName, categoriesWants = [] }: IProps) => {
  const { id: userId } = useAuth_(({ user }) => user) ?? {}
  const { register, setValue, watch } = useFormContext<IFormValues>()

  const { data: dataOffersMy, isLoading } = useQuery({
    queryFn: () => getUserIdOffers(userId!, { provider: EnumTypeProvider.offer, order: "DESC" }),
    queryKey: ["offers", { userId: userId, provider: EnumTypeProvider.offer }],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  })

  const valuesIncoming = useMemo(() => {
    const array = [ETypeOfNewCreated.new]

    if (categoriesWants.length > 0) {
      array.push(ETypeOfNewCreated.interesting)
    }

    const offersMy = dataOffersMy?.res || []

    if (offersMy.length > 0) {
      array.push(ETypeOfNewCreated.their)
    }

    return array
  }, [categoriesWants, dataOffersMy?.res])

  useEffect(() => {
    if (!loading && !isLoading) {
      if (valuesIncoming.length > 0) {
        if (valuesIncoming.length === 1) {
          setValue("select_new_proposal", ETypeOfNewCreated.new)
        }
      }
    }
  }, [valuesIncoming, loading, isLoading])

  return (
    <div className={styles.container}>
      <h3>Выбрать предложение</h3>
      <section {...register("select_new_proposal", { required: true })}>
        {valuesIncoming.length === 1 ? (
          <div data-select={true}>
            <NewCreateOffer />
          </div>
        ) : (
          SELECT_NEW_PROPOSAL({ firstName: firstName, values: valuesIncoming }).map((item) => (
            <div key={`::key::item::select::${item.value}::`} data-select={watch("select_new_proposal") === item.value}>
              <button
                disabled={loading || (item.value === ETypeOfNewCreated.interesting && !categoriesWants.length)}
                type="button"
                data-label
                onClick={(event) => {
                  event.stopPropagation()
                  if (!loading) {
                    setValue("select_new_proposal", item.value)
                  }
                }}
              >
                <div data-circle />
                <span>{item.label}</span>
              </button>
              {watch("select_new_proposal") === item.value ? (
                <>
                  {item.value === ETypeOfNewCreated.interesting ? (
                    <CategoriesWants categoriesWants={categoriesWants} loading={loading} />
                  ) : item.value === ETypeOfNewCreated.their ? (
                    <OffersMy loading={loading} />
                  ) : item.value === ETypeOfNewCreated.new ? (
                    <NewCreateOffer />
                  ) : null}
                </>
              ) : null}
            </div>
          ))
        )}
      </section>
    </div>
  )
})

interface IProps {
  loading: boolean
  firstName: string
  categoriesWants: IResponseOffersCategories[]
}
