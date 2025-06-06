import { IconSprite } from "@/components/icons/icon-sprite"

import { cx } from "@/lib/cx"

function ComponentHelper({ urgent }: { urgent: boolean }) {
  return (
    <article
      className={cx(
        "w-full [background:var(--more-red-gradient)] rounded-t-3xl md:rounded-t-2 flex-row items-center justify-center gap-2 py-2 px-2.5",
        urgent ? "flex" : "hidden",
      )}
    >
      <div className="w-5 h-5 relative">
        <IconSprite id="category-heart-white" className="w-5 h-5" />
      </div>
      <span className="text-text-button text-sm font-medium">Щедрое сердце</span>
    </article>
  )
}

export default ComponentHelper
