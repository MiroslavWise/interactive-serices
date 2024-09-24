"use client"

import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import type { IValuesCategories, IMainAndSubCategories } from "./types/types"

import { Button } from "@/components/common"
import { ItemCategory } from "./components/ItemCategory"
import ItemCategorySearch from "./components/ItemCategorySearch"

import { cx } from "@/lib/cx"
import { getOffersCategories, getUserId, patchUser } from "@/services"
import { dispatchChangeService, useAuth, useChangeService } from "@/store"

import styles from "./styles/style.module.scss"
import { IconXClose } from "@/components/icons/IconXClose"

export const ChangeService = () => {
  const [loading, setLoading] = useState(false)
  const { id: userId } = useAuth(({ auth }) => auth) ?? {}
  const visible = useChangeService(({ visible }) => visible)
  const { data: c } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = c?.data || []

  const { register, watch, handleSubmit, setValue } = useForm<IValuesCategories>({
    defaultValues: {
      "search-categories": "",
      categories: [],
    },
  })

  const { data, refetch } = useQuery({
    queryFn: () => getUserId(userId!),
    queryKey: ["user", { userId: userId }],
    enabled: !!userId,
  })

  useEffect(() => {
    if (data?.data && Array.isArray(data?.data?.categories)) {
      setValue(
        "categories",
        data?.data?.categories?.map((item) => item?.id!),
      )
    }
  }, [data])

  const idsActive = watch("categories")
  const isFilter = watch("search-categories")?.trim()?.length > 0

  const onSubmit = handleSubmit(submit)

  const categoriesMainSub = useMemo(() => {
    if (categories?.length > 0) {
      const array: IMainAndSubCategories[] = []

      for (const item of categories) {
        if (item?.provider === "main") {
          array?.push({ main: item, subs: [] })
        }
      }

      for (const item of categories) {
        const main = array?.find((item_) => item_?.main?.slug === item.provider)
        if (main) {
          main.subs.push(item)
        }
      }

      return array
    } else {
      return []
    }
  }, [categories])

  const filter = useMemo(() => {
    return categories.filter((item) => item?.title?.toLowerCase()?.includes(watch("search-categories")?.trim()?.toLowerCase()))
  }, [watch("search-categories"), categories])

  const selectedCategories = useMemo(() => {
    return categories?.filter((item) => watch("categories")?.includes(item?.id!))
  }, [watch("categories"), categories])

  function submit(values: IValuesCategories) {
    if (!loading) {
      setLoading(true)
      if (JSON.stringify(watch("categories")?.sort()) === JSON.stringify(data?.data?.categories?.map((item) => item.id)?.sort())) {
        setLoading(false)
        dispatchChangeService({ visible: false })
      } else {
        patchUser({ categories: values.categories || [] }, userId!).then((response) => {
          if (!!response.data) {
            refetch()
            setLoading(false)
            dispatchChangeService({ visible: false })
          } else {
            setLoading(false)
            dispatchChangeService({ visible: false })
          }
        })
      }
    }
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        "fixed inset-0 flex-col items-center p-0 md:p-[1.875rem]",
        visible ? "z-[1002] visible opacity-100 flex" : "-z-10 opacity-0 invisible hidden",
      )}
      data-active={visible}
      data-blur-modal
    >
      <section
        data-test="section-change-service"
        className="w-full md:max-w-[41.875rem] overflow-hidden relative z-10 h-full rounded-none md:rounded-2 bg-BG-second flex flex-col"
      >
        <header
          data-test="header-change-service"
          className="pt-5 md:pt-6 pr-0 pb-4 md:pb-5 pl-5 md:pl-6 w-full md:rounded-t-2 h-[4.25rem] md:h-[4.75rem] flex flex-row items-center justify-start gap-2"
        >
          <a
            onClick={(event) => {
              event.stopPropagation()
              dispatchChangeService({ visible: false })
            }}
            data-test="a-back-change-service"
          >
            <img src="/svg/arrow-left.svg" alt="<=" width={24} height={24} />
          </a>
          <h2 className="text-text-primary text-center text-2xl font-semibold">Добавить услуги</h2>
        </header>
        <ul className="overflow-x-hidden overflow-y-auto h-[calc(100%_-_4.25rem)] md:h-[calc(100%_-_4.75rem)]">
          <form
            className={cx(styles.form, "w-full h-full flex flex-col gap-6 overflow-x-hidden overflow-y-auto p-5")}
            onSubmit={onSubmit}
            data-test="form-change-service"
          >
            <span className="text-text-secondary text-sm font-normal pl-9">
              Чтобы увидеть все услуги, раскройте категорию. Вы можете выбрать не более {5 - (watch("categories")?.length || 0)} услуг.
            </span>
            <div
              data-search
              className="w-[calc(100%_-_2.25rem)] h-[3.25rem] relative overflow-hidden rounded-[1.625rem] border border-solid border-grey-separator ml-9 p-[1.625rem]"
            >
              <input
                {...register("search-categories")}
                placeholder="Найти услугу"
                type="text"
                list="search"
                autoComplete="off"
                data-test="input-search-change-service"
              />
              <img src="/svg/search-md.svg" alt="search" width={20} height={20} data-search />
              <img
                src="/svg/x-close.svg"
                alt="clear"
                width={20}
                height={20}
                data-clear={!!watch("search-categories")}
                onClick={(event) => {
                  event.stopPropagation()
                  setValue("search-categories", "")
                }}
              />
            </div>
            <div
              data-test="categories-selected-change-service"
              className={cx(
                "ml-9 w-[calc(100%_-_2.25rem)] flex-wrap gap-2 transition-all",
                selectedCategories.length > 0 ? "flex opacity-100 visible" : "hidden opacity-0 invisible",
              )}
            >
              {selectedCategories.map((item) => (
                <a
                  key={`::selected::item::${item.id}::`}
                  className="py-[0.4375rem] px-3 h-8 grid grid-cols-[minmax(0,1fr)_1rem] items-center gap-1 rounded-lg bg-element-grey hover:opacity-90"
                >
                  <span className="text-text-button text-sm font-normal text-ellipsis line-clamp-1 max-w-full">{item.title}</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      setValue(
                        "categories",
                        watch("categories").filter((item_) => item_ !== item.id),
                      )
                    }}
                    data-test="button-selected-current-change-service-on-delete"
                    className={cx(
                      "bg-transparent w-4 h-4 p-2 relative border-none outline-none",
                      "*:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 [&>svg>path]:stroke-text-button",
                    )}
                  >
                    <IconXClose />
                  </button>
                </a>
              ))}
            </div>
            <section {...register("categories")} data-is-filter={isFilter} className="w-full flex flex-col gap-3">
              {isFilter ? (
                filter.length ? (
                  filter.map((item) => (
                    <ItemCategorySearch key={`::item::filter::map::${item.id}::`} item={item} setValue={setValue} idsActive={idsActive} />
                  ))
                ) : (
                  <article className={isFilter ? "w-full flex items-center flex-col gap-3 px-5" : ""}>
                    <p className="text-text-primary text-base font-normal">Результатов не найдено</p>
                  </article>
                )
              ) : (
                categoriesMainSub.map((item) => (
                  <ItemCategory key={`::main::category::${item?.main?.id}::`} {...item} setValue={setValue} idsActive={idsActive} />
                ))
              )}
            </section>
            <footer className="w-full mt-auto flex flex-row items-center justify-start gap-5">
              <Button
                type="submit"
                typeButton="fill-primary"
                label="Добавить"
                loading={loading}
                data-test="button-change-service-submit"
                className="h-11 rounded-[1.375rem] md:max-w-[12.5rem]"
              />
            </footer>
          </form>
        </ul>
      </section>
    </div>
  )
}
