import type { TBlockBarter } from "./types/types"

import IconRepeat from "@/components/icons/IconRepeat"
import { BadgeServices } from "@/components/common/Badge"

export const BlockBarter: TBlockBarter = ({ initiator, consigner }) => {
  return (
    <section className="w-full grid gap-3 grid-cols-[auto_1.5rem_auto] items-center justify-start">
      <BadgeServices {...initiator!} isClickable />
      <article className="relative w-6 h-6 p-3 *:absolute *:top-1/2 *:left-1/2 *:-translate-x-1/2 *:-translate-y-1/2 *:w-6 *:h-6">
        <IconRepeat />
      </article>
      <BadgeServices {...consigner!} isClickable />
    </section>
  )
}
