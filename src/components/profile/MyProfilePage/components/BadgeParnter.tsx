import Link from "next/link"

import IconCoin from "@/components/icons/IconCoin"
import IconArrowRight from "@/components/icons/IconArrowRight"

import { useResize } from "@/helpers"

function BadgeParnter() {
  const { isTablet } = useResize()

  return (
    <section data-purple-coin className="rounded-2xl py-2 px-3 overflow-hidden">
      <Link
        className="max-w-[8.875rem] w-full text-text-button whitespace-pre-wrap text-xs md:text-sm font-normal md:font-medium block"
        href={{ pathname: "https://promo.sheira.ru/partner" }}
        target="_blank"
        title="Перейти на страницу"
      >
        {isTablet ? "Стать партнёром" : "Стать партнёром Шейра"}&nbsp;
        <div className="relative -mb-1.5 hidden md:inline-flex w-5 h-5 p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-text-button">
          <IconArrowRight />
        </div>
      </Link>
      <div
        data-mobile-icon
        className="absolute top-1 right-1 md:right-6 md:top-1/2 md:-translate-y-1/2 *:w-5 *:h-5 md:*:w-6 md:*:h-6 w-5 h-5 md:w-6 md:h-6 z-[4] flex"
      >
        <IconCoin />
      </div>
    </section>
  )
}

BadgeParnter.displayName = "BadgeParnter"
export default BadgeParnter
