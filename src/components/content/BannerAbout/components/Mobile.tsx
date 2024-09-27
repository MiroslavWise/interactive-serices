"use client"

import { cx } from "@/lib/cx"
import { dispatchIntro, useVisibleMobileAbout, dispatchVisibleMobileAbout } from "@/store"

import styles from "../styles/mobile.module.scss"

export function BannerAboutMobile() {
  const visible = useVisibleMobileAbout(({ visible }) => visible)

  return (
    <div
      onClick={() => {
        if (!visible) {
          dispatchVisibleMobileAbout(true)
        } else {
          dispatchIntro(true)
        }
      }}
      className={cx(
        styles.container,
        "md:!hidden fixed overflow-hidden flex cursor-pointer left-6 bottom-[calc(var(--height-mobile-footer-nav)_+_7.5rem)]",
        visible ? "p-6 flex-col gap-4 rounded-2 right-[5.5rem]" : "items-center justify-center w-12 h-12 rounded-full",
      )}
    >
      <article className={cx("w-full grid-cols-[minmax(0,1fr)_2rem] items-start gap-4", visible ? "grid" : "hidden")}>
        <h3 className="text-text-button text-xl font-semibold">Шейра - кто мы и чем можем быть полезны?</h3>
        <button
          onClick={(event) => {
            event.stopPropagation()
            dispatchVisibleMobileAbout(false)
          }}
          className="w-8 h-8 p-4 rounded-full border-none outline-none"
        >
          <img
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5"
            src="/svg/chevron-down-white.svg"
            alt="arrow-down"
            width={20}
            height={20}
          />
        </button>
      </article>
      <section className={cx("flex flex-row items-center gap-2 w-fit cursor-pointer", visible ? "flex" : "hidden")}>
        <p className="text-text-button text-base font-semibold">Узнать</p>
        <img src="/svg/arrow-right.svg" alt="arrow" width={24} height={24} />
      </section>
      <h1 className={cx("text-text-button text-xl font-semibold", visible ? "hidden" : "")}>?</h1>
    </div>
  )
}
