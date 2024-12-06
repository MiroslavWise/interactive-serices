"use client"

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import IconSearch from "@/components/icons/IconSearch"
import IconXClose from "@/components/icons/IconXClose"

import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"
import { type IResponseOffersCategories } from "@/services/offers-categories/types"

import ULServices from "./components/ULServices"
import EmptyArticle from "./components/EmptyArticle"
import LoadingArticle from "./components/LoadingArticle"

import { cx } from "@/lib/cx"
import { queryClient } from "@/context"
import { getSearch } from "@/services/search"
import { dispatchVisibleSearchFilters, useSearchFilters } from "@/store"
import { resolverSchemaSearch, type TSchemaSearch } from "./utils/schema"

import styles from "./styles/style.module.scss"

function BannerSearch() {
  const [loading, setLoading] = useState(false)
  const visible = useSearchFilters(({ visible }) => visible)
  const { control, setFocus, setValue, handleSubmit } = useForm<TSchemaSearch>({
    defaultValues: { input: "" },
    resolver: resolverSchemaSearch,
  })

  const [valuesPosts, setValuesPosts] = useState<IPosts[]>([])
  const [valuesOffers, setValuesOffers] = useState<IResponseOffers[]>([])
  const [valuesCategories, setValuesCategories] = useState<IResponseOffersCategories[]>([])

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

    if (trim.length > 1) {
      if (!loading) {
        setLoading(true)
        const response = await queryClient.fetchQuery({
          queryFn: () => getSearch({ query: { query: trim } }),
          queryKey: ["search", { search: trim }],
        })
        setLoading(false)

        const { data } = response

        if (data) {
          const posts = data?.posts ?? []
          const offers = data?.offers ?? []
          const categories = data?.["offers-categories"] ?? []

          setValuesPosts(posts)
          setValuesOffers(offers)
          setValuesCategories(categories)
        }
      }
    }
  }

  const onSubmit = handleSubmit(submit)

  const isAllEmpty = [valuesCategories, valuesOffers, valuesPosts].every((_) => _.length === 0)

  return (
    <div className={cx(styles.wrapper, "w-full h-full fixed inset-0 bg-translucent p-0")} data-visible={visible}>
      <form
        onSubmit={onSubmit}
        data-test="form-search-filters"
        className={cx(
          "absolute right-6 bg-BG-second rounded-2 w-full overflow-hidden flex flex-col",
          "top-[calc(var(--height-header-nav-bar)_+_1.5rem)]",
          visible ? "h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]" : "h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]",
        )}
      >
        <header className="px-5 pt-5 pb-2 w-full items-center relative">
          <Controller
            name="input"
            control={control}
            render={({ field }) => (
              <>
                <div data-icon-search>
                  <IconSearch />
                </div>
                <input {...field} type="text" placeholder="Что Вы ищете" data-test="input-search-filters" />
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
              </>
            )}
          />
        </header>
        {loading ? (
          <LoadingArticle />
        ) : isAllEmpty ? (
          <EmptyArticle />
        ) : (
          <ULServices offers={valuesOffers} posts={valuesPosts} categories={valuesCategories} />
        )}
      </form>
    </div>
  )
}

BannerSearch.displayName = "BannerSearch"
export default BannerSearch
