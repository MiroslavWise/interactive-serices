"use client"

import { type ReactNode, createContext, useContext, useState, Dispatch } from "react"

const ContextChat = createContext<IContextChat>({
  search: "",
  dispatchSearch: () => {},
})

function WrapperContext({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("")

  const dispatchSearch = (value: string) => setSearch(value)

  return (
    <ContextChat.Provider
      value={{
        search,
        dispatchSearch,
      }}
    >
      {children}
    </ContextChat.Provider>
  )
}

export const useChatContext = () => {
  const context = useContext(ContextChat)

  if (context === undefined) {
    throw new Error("Not Chat Context")
  }

  return context
}

WrapperContext.displayName = "WrapperContext"
export default WrapperContext

interface IContextChat {
  search: string
  dispatchSearch: Dispatch<string>
}
