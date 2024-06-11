"use client"

import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo } from "react"

import { ImageCategory } from "@/components/common"
import { IconSearch } from "@/components/icons/IconSearch"
import { IconXClose } from "@/components/icons/IconXClose"

import { getOffersCategories } from "@/services"
import {
  dispatchClearSearchFilters,
  dispatchDataFilterScreen,
  dispatchValueSearchFilters,
  dispatchVisibleSearchFilters,
  useSearchFilters,
} from "@/store"

import styles from "../styles/search-filters.module.scss"

export const SearchFilters = () => {
  const visible = useSearchFilters(({ visible }) => visible)
  const value = useSearchFilters(({ value }) => value)
  const history = useSearchFilters(({ history }) => history)
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

  const firstSix = useMemo(() => {
    if (!categories.length) return []

    return categories?.filter((item) => item?.provider === "main")?.slice(0, 6)
  }, [categories])

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
    <div className={styles.wrapper} data-visible={visible}>
      <form onSubmit={onSubmit} data-test="form-search-filters">
        <header>
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
        <ul data-test="ul-search-filters">
          {filterItems.length ? (
            filterItems.map((item) => (
              <li
                key={`::key::item::li::categories::search::${item.id}::`}
                onClick={(event) => {
                  event.stopPropagation()
                  onValue(item.id, item.title)
                }}
              >
                <div data-icon>
                  <ImageCategory id={item.id} />
                </div>
                <span>{titleInput(item.title)}</span>
              </li>
            ))
          ) : !!input ? (
            <article>
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить запрос или опишите его другими словами</p>
            </article>
          ) : (
            <div data-block-history>
              {!!filterItemsHistory.length ? (
                <div data-history>
                  <div data-titles>
                    <h3>История</h3>
                    <a onClick={dispatchClearSearchFilters}>Очистить</a>
                  </div>
                  <div data-list>
                    {filterItemsHistory.map((item) => (
                      <a
                        key={`::key::item::li::categories::search::h::${item.id}::`}
                        onClick={(event) => {
                          event.stopPropagation()
                          onValue(item.id, item.title)
                        }}
                      >
                        <div data-icon>
                          <ImageCategory id={item.id} />
                        </div>
                        <span>{titleHistory(item.title)}</span>
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
}

interface IValues {
  input: string
}
