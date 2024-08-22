"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import IconHelp from "@/components/icons/IconHelp"
import { IconXClose } from "@/components/icons/IconXClose"
import { IconChevron } from "@/components/icons/IconChevron"

import { cx } from "@/lib/cx"
import { dispatchCloseBanner, useBanner, useMobileSearchCategory, useSearchMobile } from "@/store"

const linkPromo = "https://promo.sheira.ru/helps"

function HeaderBannerHelp() {
  const pathname = usePathname()
  const visible = useBanner(({ visible }) => visible)
  const visibleSearchMobile = useSearchMobile(({ visible }) => visible)
  const visibleSearchCategory = useMobileSearchCategory(({ visible }) => visible)

  if (pathname !== "/" || !visible || visibleSearchCategory || visibleSearchMobile) return null

  return (
    <header
      className={cx(
        "fixed h-16 md:h-11 top-0 z-[70] w-full left-0 right-0 flex-row md:items-center justify-start md:justify-center pl-4 md:px-1.5 py-3 md:py-2.5 [background:linear-gradient(101deg,_#F56B59_0%,_#FA4E80_100%)]",
        visible || visibleSearchCategory || visibleSearchMobile ? "flex" : "hidden",
      )}
    >
      <section className="grid gap-3 md:gap-2.5 items-center grid-cols-[2.5rem_minmax(0,1fr)] md:grid-cols-[1.5rem_minmax(0,1fr)]">
        <div className="relative w-10 md:w-6 h-10 md:h-6 *:w-10 md:*:w-6 *:h-10 md:*:h-6">
          <IconHelp />
        </div>
        <div className="flex flex-col items-start md:flex-row md:items-center md:gap-6">
          <p className="text-text-button text-base md:text-sm font-semibold">Помощь Курску</p>
          <Link href={linkPromo} target="_blank" className="flex flex-row gap-1 items-center">
            <span className="text-text-button text-sm max-md:text-[0.8125rem] max-md:leading-4 font-normal">Как помочь</span>
            <div className="relative w-4 h-4 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-4 *:h-4 [&>svg>path]:fill-text-button">
              <IconChevron />
            </div>
          </Link>
        </div>
      </section>
      <button
        type="button"
        className={cx(
          "absolute right-0 md:right-6 top-0 md:top-1/2 md:-translate-y-1/2 max-md:p-2.5 flex items-center justify-center",
          "*:w-5 *:h-5 [&>svg>path]:stroke-text-button",
        )}
        onClick={dispatchCloseBanner}
      >
        <IconXClose />
      </button>
    </header>
  )
}

HeaderBannerHelp.displayName = "HeaderBannerHelp"
export default HeaderBannerHelp
