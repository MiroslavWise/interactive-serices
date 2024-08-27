"use client"

import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { memo, useCallback, useEffect, useMemo } from "react"

import { ImageCategory } from "@/components/common"
import IconSearch from "@/components/icons/IconSearch"
import IconXClose from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { getOffersCategories } from "@/services"
import { dispatchClearSearchFilters, dispatchValueSearchFilters, dispatchVisibleSearchFilters, useBanner, useSearchFilters } from "@/store"

import styles from "../styles/search-filters.module.scss"

export const SearchFilters = memo(function () {
  const visible = useSearchFilters(({ visible }) => visible)
  const value = useSearchFilters(({ value }) => value)
  const history = useSearchFilters(({ history }) => history)
  const visibleBanner = useBanner(({ visible }) => visible)
  const { data } = useQuery({
    queryFn: () => getOffersCategories(),
    queryKey: ["categories"],
  })
  const categories = data?.res || []

  const { register, setFocus, watch, setValue, handleSubmit } = useForm<IValues>({
    defaultValues: { input: value || "" },
  })

  const input = watch("input")?.trim() || ""
  const splitInput = input
    ?.trim()
    ?.replaceAll("  ", " ")
    ?.split(" ")
    ?.map((item) => item?.toLowerCase())

  const filterItems = useMemo(() => {
    if (!input || !categories.length) return []

    return categories.filter((item) => {
      return splitInput?.some((some) => item?.title?.toLowerCase()?.includes(some))
    })
  }, [categories, splitInput])

  const filterItemsHistory = useMemo(() => {
    if (!history.length || !categories.length) return []

    const splitHistory = history.join(" ")?.replaceAll("  ", " ").split(" ")

    return categories.filter((item) => {
      return splitHistory?.some((some) => item?.title?.toLowerCase()?.includes(some))
    })
  }, [categories, history])

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setFocus("input")
      }, 15)
    }
  }, [visible])

  function close() {
    dispatchVisibleSearchFilters(false)
  }

  function onValue(id: number, title: string) {
    dispatchValueSearchFilters(title, id)
    close()
  }

  function submit(values: IValues) {
    if (filterItems.length) {
      const { title, id } = filterItems[0]
      dispatchValueSearchFilters(title, id)
    }
    close()
  }

  const onSubmit = handleSubmit(submit)

  const titleInput = useCallback(
    (value: string) => {
      const split = value.split(" ")
      return (
        <>
          {split.map((item, index) =>
            splitInput.some((some) => item.toLowerCase().includes(some)) ? (
              <b key={`::item::b::${item}::`}>
                {item}
                {index !== split.length - 1 ? " " : ""}
              </b>
            ) : (
              <>
                {item}
                {index !== split.length - 1 ? " " : ""}
              </>
            ),
          )}
        </>
      )
    },
    [filterItems, splitInput],
  )
  const titleHistory = useCallback(
    (value: string) => {
      const split = value.split(" ")
      const splitHistory = history.join(" ")?.replaceAll("  ", " ").split(" ")
      return (
        <>
          {split.map((item, index) =>
            splitHistory.some((some) => item.toLowerCase().includes(some)) ? (
              <b key={`::item::b::${item}::`}>
                {item}
                {index !== split.length - 1 ? " " : ""}
              </b>
            ) : (
              <>
                {item}
                {index !== split.length - 1 ? " " : ""}
              </>
            ),
          )}
        </>
      )
    },
    [filterItems, history],
  )

  return (
    <div className={cx(styles.wrapper, "w-full h-full fixed inset-0 bg-translucent p-0")} data-visible={visible}>
      <form
        onSubmit={onSubmit}
        data-test="form-search-filters"
        className={cx(
          "absolute right-6 bg-BG-second rounded-[2rem] w-full overflow-hidden flex flex-col",
          visibleBanner
            ? "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_var(--height-banner))]"
            : "top-[calc(var(--height-header-nav-bar)_+_1.5rem)]",
          visible
            ? visibleBanner
              ? "h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem_-_var(--height-banner))]"
              : "h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]"
            : "h-[5.5rem]",
        )}
      >
        <header className="px-5 pt-5 pb-2 w-full items-center relative">
          <div data-icon-search>
            <IconSearch />
          </div>
          <input type="text" {...register("input")} placeholder="Что Вы ищете" data-test="input-search-filters" />
          <button
            type="button"
            data-icon-close
            onClick={(event) => {
              event.stopPropagation()
              setValue("input", "")
              close()
            }}
            data-test="button-search-filters-on-clear"
          >
            <IconXClose />
          </button>
        </header>
        <ul data-test="ul-search-filters" className="w-full p-2 flex flex-col overflow-y-auto overflow-x-hidden">
          {filterItems.length ? (
            filterItems.map((item) => (
              <li
                key={`::key::item::li::categories::search::${item.id}::`}
                onClick={(event) => {
                  event.stopPropagation()
                  onValue(item.id, item.title)
                }}
                className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] py-2.5 px-3 items-start gap-2 rounded-lg cursor-pointer hover:bg-grey-field"
              >
                <div className="relative w-5 h-5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
                  <ImageCategory id={item.id} slug={item?.slug} provider={item?.provider} />
                </div>
                <span className="text-text-secondary text-base font-normal">{titleInput(item.title)}</span>
              </li>
            ))
          ) : !!input ? (
            <article className="pt-16 pl-3 pr-0.5 flex flex-col items-center w-full gap-2.5">
              <h3 className="text-text-primary text-center text-xl font-semibold">Ничего не найдено</h3>
              <p className="text-text-primary text-center text-sm font-normal">
                Попробуйте изменить запрос или опишите его другими словами
              </p>
            </article>
          ) : (
            <div data-block-history className="w-full flex flex-coll gap-5">
              {!!filterItemsHistory.length ? (
                <div data-history className="w-full flex flex-col gap-2.5">
                  <div data-titles className="w-full px-3 flex items-center justify-between">
                    <h3 className="text-text-primary text-xl font-semibold">История</h3>
                    <a onClick={dispatchClearSearchFilters} className="text-text-accent text-sm font-medium cursor-pointer">
                      Очистить
                    </a>
                  </div>
                  <div data-list className="w-full flex flex-col items-center overflow-y-auto">
                    {filterItemsHistory.map((item) => (
                      <a
                        key={`::key::item::li::categories::search::h::${item.id}::`}
                        onClick={(event) => {
                          event.stopPropagation()
                          onValue(item.id, item.title)
                        }}
                        className="w-full grid grid-cols-[1.25rem_minmax(0,1fr)] items-start py-2.5 px-3 gap-2 rounded-lg cursor-pointer hover:bg-grey-field"
                      >
                        <div className="relative w-5 h-5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5">
                          <ImageCategory id={item.id} slug={item?.slug} provider={item?.provider} />
                        </div>
                        <span className="text-text-secondary text-base font-normal">{titleHistory(item.title)}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </ul>
      </form>
    </div>
  )
})

interface IValues {
  input: string
}
