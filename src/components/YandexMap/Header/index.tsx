"use client"

import { DispatchWithoutAction } from "react"

import { SearchElementMap } from "@/components/common"

import { useResize } from "@/helpers"

export const Header = ({ handleAddressLocation }: { handleAddressLocation: DispatchWithoutAction }) => {
  const { isTablet } = useResize()

  return !isTablet ? (
    <div
      id="headerRef"
      className="hidden [&>*]:max-md:hidden md:block fixed left-1/2 -translate-x-1/2 top-[6.3125rem] z-[2] max-w-[21.625rem] w-full min-w-40"
      data-test="div-search-map"
    >
      <SearchElementMap handleAddressLocation={handleAddressLocation} />
    </div>
  ) : null
}
