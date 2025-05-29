"use client"

import { memo, useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { EnumTypeProvider } from "@/types/enum"
import { ETypeOfNewCreated, type IFormValues } from "../types/types"
import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import { OffersMy } from "./OffersMy"
import { NewCreateOffer } from "./NewCreateOffer"
import { CategoriesWants } from "./CategoriesWants"

import { useAuth } from "@/store"
import { getOffers } from "@/services"
import { SELECT_NEW_PROPOSAL } from "../constants/select"

import styles from "../styles/choose-an-offer.module.scss"

export const ChooseAnOffer = memo(({ loading, firstName, categoriesWants = [] }: IProps) => {
  const { id: userId } = useAuth(({ user }) => user) ?? {}
  const { setValue, watch } = useFormContext<IFormValues>()

  const { data: dataOffersMy, isLoading } = useQuery({
    queryFn: () => getOffers({ provider: EnumTypeProvider.offer, order: "DESC", user: userId! }),
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

    const offersMy = dataOffersMy?.data || []

    if (offersMy.length > 0) {
      array.push(ETypeOfNewCreated.their)
    }

    return array
  }, [categoriesWants, dataOffersMy?.data])

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
      <section>
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
