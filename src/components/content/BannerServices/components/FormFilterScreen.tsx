import { Button, ImageCategory } from "@/components/common"

import { dispatchActiveFilterScreen, dispatchDataFilterScreen, useFiltersScreen, useOffersCategories } from "@/store"
import { useForm } from "react-hook-form"
import { IValuesFormFilters } from "../types/types"
import { useMemo } from "react"

export const FormFilterScreen = () => {
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const categories = useOffersCategories(({ categories }) => categories)

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
    <form onSubmit={onSubmit} onReset={() => reset()}>
      <section {...register("actives")}>
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
        <Button type="submit" typeButton="fill-primary" label="Применить" />
        <Button type="reset" typeButton="regular-primary" label="Сбросить" />
      </footer>
    </form>
  )
}
