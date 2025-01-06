import IconSearch from "@/components/icons/IconSearch"
import IconXClose from "@/components/icons/IconXClose"
import { IconFilters } from "@/components/icons/IconFilters"

import {
  useSearchFilters,
  useCollapseServices,
  dispatchValueSearchFilters,
  dispatchActiveFilterScreen,
  dispatchVisibleSearchFilters,
} from "@/store"
import { cx } from "@/lib/cx"

import styles from "./styles.module.scss"

export const SearchAndFilters = () => {
  const visible = useCollapseServices(({ visible }) => visible)
  const value = useSearchFilters(({ value }) => value)

  return (
    <div
      className={cx(
        styles.containerSearchAndFilters,
        "right-0 gap-1.5",
        "fixed flex flex-row items-center gap-2.5 right-0",
        "top-[calc(var(--height-header-nav-bar)_+_2.75rem)]",
      )}
      data-collapse={visible}
      data-test="search-and-filters"
    >
      <div data-search className="relative w-full h-12 rounded-3xl overflow-hidden border border-solid">
        <span data-icon-search className="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-transparent border-none outline-none">
          <IconSearch />
        </span>
        <input
          type="text"
          placeholder="Что Вы ищете"
          readOnly
          value={value}
          onClick={(event) => {
            event.stopPropagation()
            dispatchVisibleSearchFilters(true)
          }}
          className="h-full rounded-3xl border-none outline-none flex items-center"
          data-test="input-search-and-filters"
        />
        {!!value ? (
          <button
            type="button"
            data-icon-close
            className="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-transparent border-none outline-none"
            onClick={(event) => {
              event.stopPropagation()
              dispatchValueSearchFilters("", null)
            }}
            data-test="button-search-and-filters-on-clear"
          >
            <IconXClose />
          </button>
        ) : null}
      </div>
    </div>
  )
}

SearchAndFilters.displayName = "SearchAndFilters"
export default SearchAndFilters
