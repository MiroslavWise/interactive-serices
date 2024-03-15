"use client"

import { memo, useMemo } from "react"
import { useFormContext } from "react-hook-form"

import { ETypeOfNewCreated, IFormValues } from "../types/types"
import { ISelectList } from "@/components/common/custom/Select/types"

import { CustomSelect } from "@/components/common/custom"

import { useOffersCategories } from "@/store"

import styles from "../styles/new-create-offer.module.scss"

export const NewCreateOffer = memo(({}: IProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IFormValues>()

  const categories = useOffersCategories(({ categories }) => categories)

  const list = useMemo(() => {
    if (!categories) return []

    return (
      categories.map(
        (item) =>
          ({
            label: item.title,
            value: item.id,
          } as ISelectList),
      ) || []
    )
  }, [categories])

  return (
    <div className={styles.container}>
      <fieldset>
        <label>Предложение</label>
        <CustomSelect
          placeholder="Выберите категории"
          value={watch("categoryId") || null}
          list={list}
          setValue={(value) => {
            if (value) {
              setValue("categoryId", value as number)
            }
          }}
        />
      </fieldset>
      <fieldset>
        <label>Описание предложения</label>
        <div data-text-area>
          <textarea
            {...register("description_new_offer", { required: watch("select_new_proposal") === ETypeOfNewCreated.new, minLength: 5 })}
            placeholder="Описание предложения..."
          />
          <sup>{watch("description_new_offer")?.length || 0}/400</sup>
        </div>
      </fieldset>
    </div>
  )
})

interface IProps {}
