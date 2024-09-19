import Link from "next/link"

import IconCoin from "@/components/icons/IconCoin"
import IconArrowRight from "@/components/icons/IconArrowRight"

function BadgeParnter() {
  return (
    <section data-purple-coin>
      <Link
        className="max-w-[8.875rem] w-full text-text-button whitespace-pre-wrap text-sm font-medium block"
        href={{ pathname: "https://promo.sheira.ru/partner" }}
        target="_blank"
        title="Перейти на страницу"
      >
        Стать партнёром Шейра&nbsp;
        <div className="relative -mb-1.5 inline-flex w-5 h-5 p-2.5 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-5 *:h-5 [&>svg>path]:fill-text-button">
          <IconArrowRight />
        </div>
      </Link>
      <div data-icon>
        <IconCoin />
      </div>
    </section>
  )
}

BadgeParnter.displayName = "BadgeParnter"
export default BadgeParnter
