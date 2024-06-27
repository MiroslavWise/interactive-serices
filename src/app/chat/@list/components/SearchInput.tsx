"use client"

import { IconSearch } from "@/components/icons/IconSearch"

import { useChatContext } from "./ContextChats"

function SearchInput() {
  const { search, dispatchSearch } = useChatContext()

  return (
    <div className="w-full h-12 relative">
      <div className="absolute z-10 pointer-events-none w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 top-1/2 -translate-y-1/2 left-0.875">
        <IconSearch />
      </div>
      <input
        type="text"
        value={search}
        onChange={(event) => dispatchSearch(event.target.value)}
        className="w-full h-12 !rounded-3xl !pr-0.875 !pl-[calc(0.875rem_+_1.25rem_+_0.5rem)]"
        placeholder="Поиск"
      />
    </div>
  )
}

SearchInput.displayName = "SearchInput"
export default SearchInput
