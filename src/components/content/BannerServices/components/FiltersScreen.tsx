"use client"

import FormFilterScreen from "./FormFilterScreen"
import IconXClose from "@/components/icons/IconXClose"

import { cx } from "@/lib/cx"
import { dispatchActiveFilterScreen, useBanner, useFiltersScreen } from "@/store"

import styles from "../styles/filters-screen.module.scss"

export const FiltersScreen = () => {
  const visible = useFiltersScreen(({ visible }) => visible)
  const visibleBanner = useBanner(({ visible }) => visible)

  function close() {
    dispatchActiveFilterScreen(false)
  }

  return (
    <div
      className={cx(
        styles.container,
        visibleBanner
          ? "top-[calc(var(--height-header-nav-bar)_+_1.5rem_+_var(--height-banner))]"
          : "top-[calc(var(--height-header-nav-bar)_+_1.5rem)]",
        "fixed overflow-hidden max-w-[var(--width-right-services)] w-full bg-BG-second right-5 rounded-2",
        visible
          ? `opacity-100 visible ${
              visibleBanner
                ? "h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem_-_var(--height-banner))]"
                : "h-[calc(100%_-_var(--height-header-nav-bar)_-_3rem)]"
            }`
          : "opacity-0 invisible h-[4.5rem]",
      )}
      data-test="filters-screen"
    >
      <button
        data-close
        onClick={close}
        className="absolute top-5 right-5 bg-transparent p-3.5 flex items-center justify-center w-12 h-12 rounded-full border border-solid border-grey-stroke-light *:w-5 *:h-5"
      >
        <IconXClose />
      </button>
      <header className="w-full flex items-center justify-start h-[var(--height-filter-popup)]">
        <h3 className="text-text-primary text-xl font-semibold">Выбрать категории услуг</h3>
      </header>
      {visible ? <FormFilterScreen /> : null}
    </div>
  )
}
