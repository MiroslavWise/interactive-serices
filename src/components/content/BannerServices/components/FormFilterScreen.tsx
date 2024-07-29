import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"

import { IValuesFormFilters } from "../types/types"

import { Button, ImageCategory } from "@/components/common"

import { getOffersCategories } from "@/services"
import { dispatchActiveFilterScreen, dispatchDataFilterScreen, useFiltersScreen } from "@/store"

export const FormFilterScreen = () => {
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.res || []

  const mainCategories = useMemo(() => categories?.filter((item) => item?.provider === "main") || [], [categories])

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IValuesFormFilters>({
    defaultValues: { actives: activeFilters },
  })

  function submit(values: IValuesFormFilters) {
    dispatchDataFilterScreen(values.actives)
    close()
  }

  const onSubmit = handleSubmit(submit)

  function close() {
    dispatchActiveFilterScreen(false)
  }

  function handleCategory(id: number) {
    const actives = watch("actives")
    if (actives?.some((item) => item === id)) {
      setValue("actives", [...actives.filter((item) => item !== id)])
    } else {
      setValue("actives", [...actives, id])
    }
  }

  return (
    <form onSubmit={onSubmit} onReset={() => reset()} data-test="form-filter-screen">
      <section {...register("actives")} className="h-full">
        {mainCategories.map((item) => (
          <a
            key={`::item::category::filter::${item.id}::`}
            data-active={watch("actives")?.some((some) => some === item.id)}
            onClick={(event) => {
              event.stopPropagation()
              handleCategory(item.id)
            }}
          >
            <div data-icon>
              <ImageCategory id={item.id} />
            </div>
            <p>{item.title}</p>
          </a>
        ))}
      </section>
      <footer>
        <Button type="submit" typeButton="fill-primary" label="Применить" data-test="button-submit-filter-screen" />
        <Button type="reset" typeButton="regular-primary" label="Сбросить" data-test="button-reset-filter-screen" />
      </footer>
    </form>
  )
}
