import Link from "next/link"

import IconXClose from "@/components/icons/IconXClose"
import IconChevron from "@/components/icons/IconChevron"

import { cx } from "@/lib/cx"
import { dispatchCloseBanner } from "@/store"

import styles from "./style.module.scss"

const link = `https://promo.sheira.ru/partner`

function BannerPartner({ is }: { is: boolean }) {
  return (
    <div
      className={cx(
        styles.wrapper,
        "relative overflow-hidden transition-transform duration-300 h-[var(--height-banner)] w-full flex flex-row md:items-center justify-start md:justify-center pl-2.5 md:pl-4 md:px-1.5 py-3 md:py-2.5",
        is ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <p className="text-text-button text-base md:text-sm font-semibold inline flex-wrap items-center md:justify-center relative z-30">
        Участвуйте в партнёрской программе Sheira!
        <Link
          href={{ pathname: link }}
          target="_blank"
          className="inline-flex flex-row gap-1 items-center whitespace-nowrap flex-nowrap ml-1 md:ml-5 relative group"
        >
          <span className="text-text-button text-[0.8125rem] md:text-sm max-md:leading-4 font-normal">Узнать подробности</span>
          <div className="relative w-4 h-4 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 [&>svg>path]:fill-text-button">
            <IconChevron />
          </div>
        </Link>
      </p>
      <button
        type="button"
        className={cx(
          "absolute right-0 md:right-6 top-0 md:top-1/2 md:-translate-y-1/2 max-md:p-2.5 flex items-center justify-center z-50",
          "*:w-5 *:h-5 [&>svg>path]:stroke-text-button",
        )}
        onClick={dispatchCloseBanner}
      >
        <IconXClose />
      </button>
      <span data-1 className="z-10 h-auto aspect-square absolute top-1/2 -translate-x-1/2 -translate-y-1/2 " />
      <span data-2 className="z-10 h-auto aspect-square absolute -translate-x-1/2 top-0" />
      <span data-3 className="z-10 h-auto aspect-square absolute -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}

BannerPartner.displayName = "BannerPartner"
export default BannerPartner
