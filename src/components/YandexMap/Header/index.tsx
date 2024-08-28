import { SearchElementMap } from "@/components/common/SearchElementMap"

import { cx } from "@/lib/cx"
import { useBanner } from "@/store"

function HeaderMap() {
  const visible = useBanner(({ visible }) => visible)

  return (
    <div
      id="headerRef"
      className={cx(
        "[&>*]:max-md:hidden md:block fixed left-1/2 -translate-x-1/2 z-[2] max-w-[21.625rem] w-full min-w-40 max-md:hidden",
        visible ? "top-[calc(6.3125rem_+_var(--height-banner))]" : "top-[6.3125rem]",
      )}
      data-test="div-search-map"
    >
      <SearchElementMap />
    </div>
  )
}

HeaderMap.displayName = "HeaderMap"
export default HeaderMap
