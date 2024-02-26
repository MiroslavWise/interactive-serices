"use client"

import { ReactNode, useCallback, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"

import { ImageCategory } from "@/components/common"
import { IconSearch } from "@/components/icons/IconSearch"
import { IconXClose } from "@/components/icons/IconXClose"

import { dispatchValueSearchFilters, dispatchVisibleSearchFilters, useOffersCategories, useSearchFilters } from "@/store"

import styles from "../styles/search-filters.module.scss"

export const SearchFilters = () => {
  const visible = useSearchFilters(({ visible }) => visible)
  const value = useSearchFilters(({ value }) => value)
  const categories = useOffersCategories(({ categories }) => categories)

  const {
    formState: { errors },
    register,
    setFocus,
    watch,
    handleSubmit,
  } = useForm<IValues>({
    defaultValues: { input: value },
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

  const title = useCallback(
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
    [filterItems],
  )

  return (
    <div className={styles.wrapper} data-visible={visible}>
      <form onSubmit={onSubmit}>
        <header>
          <div data-icon-search>
            <IconSearch />
          </div>
          <input type="text" {...register("input")} placeholder="Что Вы ищете" />
          <button
            type="button"
            data-icon-close
            onClick={(event) => {
              event.stopPropagation()
              close()
            }}
          >
            <IconXClose />
          </button>
        </header>
        <ul>
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
                <span>{title(item.title)}</span>
              </li>
            ))
          ) : (
            <article>
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить запрос или опишите его другими словами</p>
            </article>
          )}
        </ul>
      </form>
    </div>
  )
}

interface IValues {
  input: string
}
