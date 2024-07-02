"use client"

import { type ReactNode, createContext, useContext, useState, Dispatch } from "react"

export type TNavigateChat = "all" | "personal" | "barter"

const ContextChat = createContext<IContextChat>({
  search: "",
  dispatchSearch: () => {},
  navigate: "all",
  dispatchNavigate: () => {},
})

function WrapperContext({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("")
  const [navigate, setNavigate] = useState<TNavigateChat>("all")

  const dispatchNavigate = (value: TNavigateChat) => setNavigate(value)
  const dispatchSearch = (value: string) => setSearch(value)

  return (
    <ContextChat.Provider
      value={{
        search,
        dispatchSearch,
        navigate,
        dispatchNavigate,
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

  navigate: TNavigateChat
  dispatchNavigate: Dispatch<TNavigateChat>
}
