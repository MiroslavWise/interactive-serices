"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

import { EnumTypeProvider } from "@/types/enum"
import { type IPosts } from "@/services/posts/types"
import { type IResponseOffers } from "@/services/offers/types"

import ActiveFilters from "./components/ActiveFilters"
import { ServicesMobile } from "./components/Services"
import { IconSearch } from "@/components/icons/IconSearch"
import { IconSprite } from "@/components/icons/icon-sprite"
import TimesFilter from "../../BannerServices/components/TimesFilter"
import IconDoubleChevronsUp from "@/components/icons/IconDoubleChevronsUp"
const FilterCategory = dynamic(() => import("./components/FilterCategory"))

import {
  useFiltersScreen,
  useFiltersServices,
  useMobileSearchCategory,
  dispatchActiveFilterScreen,
  dispatchFiltersServiceProvider,
  dispatchMobileSearchCategoryVisible,
} from "@/store"
import { cx } from "@/lib/cx"
import { queryClient } from "@/context"
import { useDebounce } from "@/helpers"
import { getSearch } from "@/services/search"
import { SERVICES } from "../../BannerServices/constants"

import styles from "./styles/style.module.scss"

export default function SearchCategory() {
  const [loading, setLoading] = useState(false)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const visible = useMobileSearchCategory(({ visible }) => visible)
  const providers = useFiltersServices(({ providers }) => providers)
  const activeFilters = useFiltersScreen(({ activeFilters }) => activeFilters)
  const visibleFilter = useFiltersScreen(({ visible }) => visible)
  const [input, setInput] = useState("")
  const ref = useRef<HTMLInputElement>(null)
  const refSection = useRef<HTMLInputElement>(null)
  const refArticle = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(search, 1250)
  const [valuesPosts, setValuesPosts] = useState<IPosts[]>([])
  const [valuesOffers, setValuesOffers] = useState<IResponseOffers[]>([])

  async function search() {
    const trim = input.trim().toLowerCase()

    if (!loading) {
      setLoading(true)
      if (trim.length > 1) {
        const response = await queryClient.fetchQuery({
          queryFn: () => getSearch({ query: { query: trim } }),
          queryKey: ["search", { search: trim }],
        })
        setLoading(false)

        const { data } = response

        if (data) {
          const posts = data?.posts ?? []
          const offers = data?.offers ?? []

          setValuesPosts(posts)
          setValuesOffers(offers)
        }
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
    setLoadingSearch(false)
  }

  function setHeight(ref: HTMLInputElement, property: string) {
    const height = ref.clientHeight
    ref.style.setProperty(property, `${height / 16}rem`)
  }

  useEffect(() => {
    if (ref.current && refSection.current && refArticle.current) {
      const setDiv = () => setHeight(ref.current!, "--h")
      const setArticle = () => setHeight(refArticle.current!, "--h-article")
      const setSection = () => setHeight(refSection.current!, "--h-section")

      ref.current.addEventListener("resize", setDiv)
      refSection.current.addEventListener("resize", setSection)
      refArticle.current.addEventListener("resize", setArticle)

      return () => {
        ref.current?.removeEventListener("resize", setDiv)
        refSection.current?.removeEventListener("resize", setSection)
        refArticle.current?.removeEventListener("resize", setArticle)
      }
    }
  }, [])

  return (
    <div
      className={cx(
        styles.container,
        "w-full fixed z-[90] h-full rounded-t-3xl bg-BG-second inset-0",
        visible ? " translate-y-[1.625rem]" : "translate-y-[calc(100%_-_var(--height-mobile-footer-nav)_-_6rem)]",
      )}
      ref={ref}
    >
      <button
        type="button"
        title={visible ? "Закрыть" : "Открыть"}
        aria-label={visible ? "Закрыть" : "Открыть"}
        aria-labelledby={visible ? "Закрыть" : "Открыть"}
        onClick={() => dispatchMobileSearchCategoryVisible(!visible)}
        className={cx(
          "absolute z-[91] left-1/2 top-0 p-2 rounded-full w-10 h-10 border-none outline-none flex items-center justify-center bg-BG-second",
          "*:aspect-square *:w-5 *:h-5",
          visible && "*:!rotate-180",
        )}
      >
        <IconDoubleChevronsUp />
      </button>
      {visibleFilter ? <FilterCategory /> : null}
      <header className="p-5 pt-6 flex flex-row gap-2.5 cursor-pointer w-full h-24 relative">
        <div data-search className="relative h-12 w-full">
          <input
            type="text"
            onClick={() => dispatchMobileSearchCategoryVisible(true)}
            value={input}
            onChange={(event) => {
              setLoadingSearch(true)
              setInput(event.target.value || "")
              debouncedValue()
            }}
            readOnly={!visible}
            required
            placeholder="Что Вы ищете"
            className="h-3 rounded-3xl !pl-[2.625rem]"
            inputMode="search"
            enterKeyHint="search"
          />
          <div className={cx("absolute w-5 h-5 left-3.5 top-1/2 -translate-y-1/2 pointer-events-none", "*:w-5 *:h-5")}>
            <IconSearch />
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setInput("")
            }}
            title="Очистить поле ввода"
            aria-label="Очистить поле ввода"
            className={cx(
              "absolute h-9 w-9 top-1/2 -translate-y-1/2 right-3.5 p-2.5 items-center justify-center bg-transparent border-none outline-none",
              !!input?.trim() ? "flex" : "hidden",
              "*:w-4 *:h-4",
            )}
          >
            <IconSprite id="x-close-20-20" />
          </button>
        </div>
      </header>
      <section className={cx("w-full h-[calc(100%_-_6rem)] overflow-x-hidden overflow-y-auto")} ref={refSection}>
        <article
          className={cx("w-full flex flex-col gap-[1.125rem] py-2.5 px-5", "*:flex *:w-full *:flex-row *:items-start")}
          ref={refArticle}
        >
          <div data-filters-services className="justify-start gap-4">
            {SERVICES.map((item) => (
              <a
                key={`::key::item::provider::${item.value}::`}
                data-active={providers === item.value}
                onClick={(event) => {
                  event.stopPropagation()
                  dispatchFiltersServiceProvider(item.value)
                }}
                className={cx(
                  "relative cursor-pointer",
                  providers === item.value ? "[&>span]:text-text-accent" : "[&>span]:text-text-secondary",
                )}
              >
                <span className="text-center text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>
          <TimesFilter />
          {activeFilters.length && providers == EnumTypeProvider.offer ? <ActiveFilters activeFilters={activeFilters} /> : null}
        </article>
        <ServicesMobile posts={valuesPosts} offers={valuesOffers} isSearch={!!input.trim()} loading={loadingSearch} />
      </section>
    </div>
  )
}
