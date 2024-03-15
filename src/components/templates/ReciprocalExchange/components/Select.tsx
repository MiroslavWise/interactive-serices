"use client"

import { useFormContext } from "react-hook-form"

import { ETypeOfNewCreated, IFormValues } from "../types/types"

import { SELECT_NEW_PROPOSAL } from "../constants/select"

import styles from "../styles/choose-an-offer.module.scss"
import { IResponseOffersCategories } from "@/services/offers-categories/types"
import { memo } from "react"
import { CategoriesWants } from "./CategoriesWants"
import { OffersMy } from "./OffersMy"
import { NewCreateOffer } from "./NewCreateOffer"

export const ChooseAnOffer = memo(({ loading, firstName, categoriesWants }: IProps) => {
  const { register, setValue, watch } = useFormContext<IFormValues>()

  return (
    <div className={styles.container}>
      <h3>Выбрать предложение</h3>
      <section {...register("select_new_proposal", { required: true })}>
        {SELECT_NEW_PROPOSAL({ firstName: firstName }).map((item) => (
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
        ))}
      </section>
    </div>
  )
})

interface IProps {
  loading: boolean
  firstName: string
  categoriesWants: IResponseOffersCategories[]
}
