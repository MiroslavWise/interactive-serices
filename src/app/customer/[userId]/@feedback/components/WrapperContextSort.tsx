"use client"

import { createContext, Dispatch, type ReactNode, useContext, useState } from "react"

export type TFilterSort = "default" | "first-positive" | "first-negative"

const ContextSortCustomer = createContext<IPropsContextSort>({ filter: "default", dispatch() {} })

function WrapperContextSortCustomer({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<TFilterSort>("default")

  function dispatch(value: TFilterSort) {
    setFilter(value)
  }

  return <ContextSortCustomer.Provider value={{ filter, dispatch }}>{children}</ContextSortCustomer.Provider>
}

export const useContextSortCustomer = () => {
  const context = useContext(ContextSortCustomer)

  if (context === undefined) {
    throw new Error("Not Context Sort Customer")
  }

  return context
}

interface IPropsContextSort {
  filter: TFilterSort
  dispatch: Dispatch<TFilterSort>
}

WrapperContextSortCustomer.displayName = "WrapperContextSortCustomer"
export default WrapperContextSortCustomer
