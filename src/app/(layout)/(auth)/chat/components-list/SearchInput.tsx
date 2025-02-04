"use client"

import { IconSearch } from "@/components/icons/IconSearch"

import { cx } from "@/lib/cx"
import { useChatContext } from "./ContextChats"
import { IconSprite } from "@/components/icons/icon-sprite"

function SearchInput() {
  const { search, dispatchSearch } = useChatContext()

  return (
    <div className="w-full h-12 relative">
      <div className="absolute z-10 pointer-events-none w-5 h-5 *:w-5 *:h-5 top-1/2 -translate-y-1/2 left-3.5">
        <IconSearch />
      </div>
      <input
        type="text"
        value={search}
        onChange={(event) => dispatchSearch(event.target.value)}
        className="w-full h-12 !rounded-3xl !pr-3.5 !pl-[calc(0.875rem_+_1.25rem_+_0.5rem)]"
        placeholder="Поиск"
      />
      <div
        className={cx(
          !!search.trim()
            ? "absolute z-10 cursor-pointer w-5 h-5 *:w-5 *:h-5 top-1/2 -translate-y-1/2 right-3.5 [&>svg>path]:stroke-element-grey-light"
            : "hidden",
        )}
        onClick={() => dispatchSearch("")}
      >
        <IconSprite id="x-close-20-20" />
      </div>
    </div>
  )
}

SearchInput.displayName = "SearchInput"
export default SearchInput
