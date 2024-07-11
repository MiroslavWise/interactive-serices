"use client"

import { IconSearch } from "@/components/icons/IconSearch"

import { useChatContext } from "./ContextChats"
import { IconXClose } from "@/components/icons/IconXClose"
import { cx } from "@/lib/cx"

function SearchInput() {
  const { search, dispatchSearch } = useChatContext()

  return (
    <div className="w-full h-12 relative">
      <div className="absolute z-10 pointer-events-none w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 top-1/2 -translate-y-1/2 left-3.5">
        <IconSearch />
      </div>
      <input
        type="text"
        value={search}
        onChange={(event) => dispatchSearch(event.target.value)}
        className="w-full h-12 !rounded-3xl !pr-0.875 !pl-[calc(0.875rem_+_1.25rem_+_0.5rem)]"
        placeholder="Поиск"
      />
      <div
        className={cx(
          !!search.trim()
            ? "absolute z-10 cursor-pointer w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 top-1/2 -translate-y-1/2 right-3.5 [&>svg>path]:stroke-element-grey-light"
            : "hidden",
        )}
      >
        <IconXClose />
      </div>
    </div>
  )
}

SearchInput.displayName = "SearchInput"
export default SearchInput
