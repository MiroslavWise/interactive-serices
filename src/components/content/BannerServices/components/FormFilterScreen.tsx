import { memo, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

import { type IValuesFormFilters } from "../types/types"

import Button from "@/components/common/Button"
import { ImageCategory } from "@/components/common"
import { IconSpriteCategoryId } from "@/components/icons/icon-sprite-category"

import { cx } from "@/lib/cx"
import { getOffersCategories } from "@/services"
import { dispatchActiveFilterScreen, dispatchDataFilterScreen, useFiltersScreen } from "@/store"

function FormFilterScreen() {
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.data || []

  const mainCategories = useMemo(() => categories?.filter((item) => item?.provider === "main") || [], [categories])

  const { handleSubmit, reset, setValue, control } = useForm<IValuesFormFilters>({
    defaultValues: { actives: activeFilters || [] },
  })

  const onSubmit = handleSubmit((values: IValuesFormFilters) => {
    dispatchDataFilterScreen(values.actives)
    close()
  })

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
                  item?.slug === "kursk" &&
                    `border border-[var(--border-red)] [background:var(--linear-red-help-opacity)] hover:border-[var(--border-red-contrast)]`,
                  field.value.some((some) => some === item.id) &&
                    item?.slug === "kursk" &&
                    `border-none [background:var(--more-red-gradient)]`,
                )}
              >
                <div className="w-6 h-6 p-3 bg-transparent relative *:w-6 *:h-6">
                  {item?.slug === "kursk" && field.value.some((some) => some === item.id) ? (
                    <IconSpriteCategoryId id="category-heart-white" />
                  ) : (
                    <ImageCategory id={item.id} slug={item?.slug} provider={item?.provider} />
                  )}
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

FormFilterScreen.displayName = "FormFilterScreen"
export default memo(FormFilterScreen)
