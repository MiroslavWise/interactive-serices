"use client"

import { useEffect } from "react"
import { useFormContext, Controller } from "react-hook-form"

import IconSearch from "@/components/icons/IconSearch"
import { IconSprite } from "@/components/icons/icon-sprite"

import ULServices from "./components/ULServices"
import EmptyArticle from "./components/EmptyArticle"
import LoadingArticle from "./components/LoadingArticle"

import { cx } from "@/lib/cx"
import { type TSchemaSearch } from "./utils/schema"
import { dispatchVisibleSearchFilters, useSearchFilters } from "@/store"
import { useFormProviderSearch } from "@/app/(layout)/components/FormProviderSearch"

import styles from "./styles/style.module.scss"

function BannerSearch() {
  const visible = useSearchFilters(({ visible }) => visible)
  const { control, setFocus, setValue, handleSubmit } = useFormContext<TSchemaSearch>()

  const { loading, onSearch, offers, posts, isF, setIsF } = useFormProviderSearch()

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setFocus("input")
      }, 25)
    }
  }, [visible])

  function close() {
    dispatchVisibleSearchFilters(false)
  }

  async function submit(values: TSchemaSearch) {
    const trim = values.input.trim().toLowerCase()
    await onSearch(trim)
  }

  const onSubmit = handleSubmit(submit)

  const isAllEmpty = [offers, posts].every((_) => _.length === 0)

  return (
    <div
      className={cx(styles.wrapper, "w-full h-full fixed inset-0 bg-translucent p-0")}
      data-visible={visible}
      onClick={(event) => {
        event.stopPropagation()
        close()
      }}
    >
      <form
        onSubmit={onSubmit}
        data-test="form-search-filters"
        className={cx(
          "absolute right-6 bg-BG-second rounded-2 w-full overflow-hidden flex flex-col",
          "top-[calc(var(--height-header-nav-bar)_+_1.5rem)]",
          visible ? "h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]" : "h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="px-5 pt-5 pb-2 w-full items-center relative">
          <Controller
            name="input"
            control={control}
            render={({ field }) => (
              <>
                <button data-icon-search={!!field.value.trim()} type="submit">
                  <IconSearch />
                </button>
                <input {...field} type="text" placeholder="Что Вы ищете" data-test="input-search-filters" className="pl-3.5" />
                <button
                  type="button"
                  data-icon-close
                  onClick={(event) => {
                    event.stopPropagation()
                    setValue("input", "")
                    close()
                    setIsF(false)
                  }}
                  data-test="button-search-filters-on-clear"
                >
                  <IconSprite id="x-close-20-20" />
                </button>
              </>
            )}
          />
        </header>
        {loading ? (
          <LoadingArticle />
        ) : isAllEmpty && !isF ? (
          <section data-test="ul-search-filters" className="w-full py-2 px-5 flex flex-col overflow-y-auto overflow-x-hidden gap-2" />
        ) : isAllEmpty ? (
          <EmptyArticle />
        ) : (
          <ULServices offers={offers} posts={posts} />
        )}
      </form>
    </div>
  )
}

BannerSearch.displayName = "BannerSearch"
export default BannerSearch
