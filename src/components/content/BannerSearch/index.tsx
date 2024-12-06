"use client"

import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import IconSearch from "@/components/icons/IconSearch"
import IconXClose from "@/components/icons/IconXClose"

import { IPosts } from "@/services/posts/types"
import { IResponseOffers } from "@/services/offers/types"
import { IResponseOffersCategories } from "@/services/offers-categories/types"

import { ImageCategory } from "@/components/common"
import ButtonExpand from "./components/ButtonExpand"
import CardPost from "@/components/common/Card/CardPost"
import LoadingArticle from "./components/LoadingArticle"
import CardBallon from "@/components/common/Card/CardBallon"

import { cx } from "@/lib/cx"
import { queryClient } from "@/context"
import { getSearch } from "@/services/search"
import { dispatchDataFilterScreen, dispatchVisibleSearchFilters, useSearchFilters } from "@/store"

import styles from "./styles/style.module.scss"
import EmptyArticle from "./components/EmptyArticle"

function BannerSearch() {
  const [loading, setLoading] = useState(false)
  const visible = useSearchFilters(({ visible }) => visible)
  const { control, setFocus, setValue, handleSubmit } = useForm<IValues>({
    defaultValues: { input: "" },
  })

  const [valuesPosts, setValuesPosts] = useState<IPosts[]>([])
  const [expandPosts, setExpandPosts] = useState(false)

  const [valuesOffers, setValuesOffers] = useState<IResponseOffers[]>([])
  const [expandOffers, setExpandOffers] = useState(false)

  const [valuesCategories, setValuesCategories] = useState<IResponseOffersCategories[]>([])
  const [expandCategories, setExpandCategories] = useState(false)

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

  async function submit(values: IValues) {
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
          <ul data-test="ul-search-filters" className="w-full p-2 flex flex-col overflow-y-auto overflow-x-hidden gap-2">
            <a className={cx(valuesOffers.length > 0 ? "flex flex-row" : "hidden", "w-full items-center justify-between px-2")}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">Сервисы</span>
                <div className="relative flex items-center justify-center h-[1.1875rem] min-w-[1.1875rem] w-fit rounded-[0.59375rem] bg-element-accent-1">
                  <span className="text-[0.625rem] text-center text-text-button font-semibold">{valuesOffers.length}</span>
                </div>
              </div>
              <ButtonExpand on={setExpandOffers} is={expandOffers} />
            </a>
            <ul className={cx(expandOffers ? "flex flex-col gap-2" : "hidden", "w-full")}>
              {valuesOffers.map((item) => (
                <CardBallon key={`:s:c:x:Z:a:offer-${item.id}`} offer={item} />
              ))}
            </ul>
            <a className={cx(valuesPosts.length > 0 ? "flex flex-row" : "hidden", "w-full items-center justify-between px-2")}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">Посты</span>
                <div className="relative flex items-center justify-center h-[1.1875rem] min-w-[1.1875rem] w-fit rounded-[0.59375rem] bg-element-accent-1">
                  <span className="text-[0.625rem] text-center text-text-button font-semibold">{valuesPosts.length}</span>
                </div>
              </div>
              <ButtonExpand on={setExpandPosts} is={expandPosts} />
            </a>
            <ul className={cx(expandPosts ? "flex flex-col gap-2" : "hidden", "w-full")}>
              {valuesPosts.map((item) => (
                <CardPost key={`:s:d:f:G:post-${item.id}`} post={item} />
              ))}
            </ul>
            <a className={cx(valuesCategories.length > 0 ? "flex flex-row" : "hidden", "w-full items-center justify-between px-2")}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">Категории</span>
                <div className="relative flex items-center justify-center h-[1.1875rem] min-w-[1.1875rem] w-fit rounded-[0.59375rem] bg-element-accent-1">
                  <span className="text-[0.625rem] text-center text-text-button font-semibold">{valuesCategories.length}</span>
                </div>
              </div>
              <ButtonExpand on={setExpandCategories} is={expandCategories} />
            </a>
            <ul className={cx(expandCategories ? "grid grid-cols-3 gap-5" : "hidden", "w-full")}>
              {valuesCategories.map((item) => (
                <li
                  key={`:d:s:A:-${item.id}:`}
                  className="w-full flex flex-col gap-1.5 items-center cursor-pointer"
                  onClick={() => {
                    dispatchDataFilterScreen([item.id])
                    dispatchVisibleSearchFilters(false)
                  }}
                >
                  <div className="rounded-full w-11 h-11 bg-grey-field flex items-center justify-center *:w-6 *:h-6 p-2.5">
                    <ImageCategory id={item.id} provider={item.provider} slug={item.slug} />
                  </div>
                  <span className="text-[0.8125rem] leading-4 text-center text-text-primary line-clamp-2 text-ellipsis">{item.title}</span>
                </li>
              ))}
            </ul>
          </ul>
        )}
      </form>
    </div>
  )
}

BannerSearch.displayName = "BannerSearch"
export default BannerSearch

interface IValues {
  input: string
}
