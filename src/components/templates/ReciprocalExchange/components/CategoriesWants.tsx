"use client"

import { memo } from "react"
import { useFormContext } from "react-hook-form"

import { ETypeOfNewCreated, IFormValues } from "../types/types"

import { ImageCategory } from "@/components/common"

import { IResponseOffersCategories } from "@/services/offers-categories/types"

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
                <ImageCategory id={item.id!} />
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
              {...register("description", { required: watch("select_new_proposal") === ETypeOfNewCreated.interesting, minLength: 1 })}
              placeholder="Описание предложения..."
              maxLength={512}
            />
            <span>{watch("description")?.length || 0}/512</span>
          </div>
          {errors.description ? <i>{errors?.description?.message}</i> : null}
        </fieldset>
      ) : null}
    </div>
  )
})

interface IProps {
  categoriesWants: IResponseOffersCategories[]
  loading: boolean
}
