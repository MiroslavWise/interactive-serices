import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { IValuesFormFilters } from "../types/types"

import { Button, ImageCategory } from "@/components/common"

import { getOffersCategories } from "@/services"
import { dispatchActiveFilterScreen, dispatchDataFilterScreen, useFiltersScreen } from "@/store"
import { cx } from "@/lib/cx"

export const FormFilterScreen = () => {
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.res || []

  const mainCategories = useMemo(() => categories?.filter((item) => item?.provider === "main") || [], [categories])

  const { register, watch, handleSubmit, reset, setValue, control } = useForm<IValuesFormFilters>({
    defaultValues: { actives: activeFilters || [] },
  })

  function submit(values: IValuesFormFilters) {
    dispatchDataFilterScreen(values.actives)
    close()
  }

  const onSubmit = handleSubmit(submit)

  function close() {
    dispatchActiveFilterScreen(false)
  }

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => reset()}
      data-test="form-filter-screen"
      className="relative w-ful h-[calc(100%_-_var(--height-filter-popup))] overflow-hidden pt-2.5 px-5 pb-[5.25rem]"
    >
      <Controller
        name="actives"
        control={control}
        render={({ field }) => (
          <section className="!h-full w-full grid grid-cols-2 gap-2.5 overflow-y-auto">
            {mainCategories.map((item) => (
              <a
                key={`::item::category::filter::${item.id}::`}
                onClick={(event) => {
                  event.stopPropagation()
                  const values = field.value
                  if (values.some((_) => _ === item.id)) {
                    setValue("actives", [...values.filter((_) => _ !== item.id)])
                  } else {
                    setValue("actives", [...values, item.id])
                  }
                }}
                className={cx(
                  "flex flex-col items-start justify-between h-24 w-full p-3 rounded-xl border-grey-stroke-light border-solid cursor-pointer",
                  field.value.some((some) => some === item.id)
                    ? "border-none bg-gradient-to-r from-[#8b89f5] to-[#625ff9]"
                    : "border bg-BG-second",
                )}
              >
                <div className="w-6 h-6 p-3 bg-transparent relative *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *:h-6">
                  <ImageCategory id={item.id} slug={item?.slug} provider={item?.provider} />
                </div>
                <p
                  className={cx(
                    "text-sm font-normal line-clamp-2 text-ellipsis",
                    field.value.some((some) => some === item.id) ? "text-text-button" : "text-text-primary",
                  )}
                >
                  {item.title}
                </p>
              </a>
            ))}
          </section>
        )}
      />
      <footer className="w-full flex items-center flex-row gap-3 p-5 pt-2.5 h-min absolute bottom-0 left-0 right-0 z-20">
        <Button type="submit" typeButton="fill-primary" label="Применить" data-test="button-submit-filter-screen" />
        <Button type="reset" typeButton="regular-primary" label="Сбросить" data-test="button-reset-filter-screen" />
      </footer>
    </form>
  )
}
