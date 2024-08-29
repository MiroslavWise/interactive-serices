"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"

import { ETypeOfNewCreated, type IFormValues } from "../types/types"

import { ImageCategory } from "@/components/common"

import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import styles from "../styles/categories-wants.module.scss"

export const CategoriesWants = memo(({ categoriesWants, loading }: IProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IFormValues>()

  return (
    <div className={styles.container}>
      <section {...register("category", { required: watch("select_new_proposal") === ETypeOfNewCreated.interesting })}>
        {categoriesWants
          ?.filter((item) => (!!watch("category") ? item?.id === watch("category") : true))
          ?.map((item) => (
            <a
              key={`::${item?.id}::want::`}
              data-active={watch("category") === item.id}
              onClick={(event) => {
                if (loading) {
                  return
                }
                event.stopPropagation()
                if (watch("category") !== item.id) {
                  setValue("category", item.id)
                } else {
                  setValue("category", undefined)
                }
              }}
            >
              <div data-img>
                <ImageCategory id={item.id!} slug={item?.slug} provider={item?.provider} />
              </div>
              <span>{item.title}</span>
              {watch("category") === item.id ? <img src="/svg/x-close-white.svg" alt="x" width={16} height={16} /> : null}
            </a>
          ))}
      </section>
      {!!watch("category") ? (
        <fieldset>
          <div data-text-area>
            <textarea
              {...register("description", {
                required: watch("select_new_proposal") === ETypeOfNewCreated.interesting,
                minLength: 1,
                maxLength: 512,
              })}
              placeholder="Описание предложения..."
              maxLength={512}
              minLength={1}
            />
            <span>{watch("description")?.length || 0}/512</span>
          </div>
          {!!errors.description ? (
            errors.description.type === "minLength" ? (
              <i>Это поле не может оставаться пустым</i>
            ) : errors.description.type === "maxLength" ? (
              <i>Не более 512 символов</i>
            ) : (
              <i>{errors.description.message}</i>
            )
          ) : null}
        </fieldset>
      ) : null}
    </div>
  )
})

interface IProps {
  categoriesWants: IResponseOffersCategories[]
  loading: boolean
}
