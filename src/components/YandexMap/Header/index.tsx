import { SearchElementMap } from "@/components/common/SearchElementMap"

export const Header = () => {
  return (
    <div
      id="headerRef"
      className="hidden [&>*]:max-md:hidden md:block fixed left-1/2 -translate-x-1/2 top-[6.3125rem] z-[2] max-w-[21.625rem] w-full min-w-40 max-md:hidden"
      data-test="div-search-map"
    >
      <SearchElementMap />
    </div>
  )
}
