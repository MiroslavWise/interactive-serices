"use client"

import { EnumStatusBarter } from "@/types/enum"
import { createContext, Dispatch, useContext, useState, type ReactNode } from "react"

const ContextWrapperCurrentAndCompleted = createContext<IStateContext>({ state: EnumStatusBarter.EXECUTED, dispatch() {} })

function WrapperCurrentAndCompleted({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EnumStatusBarter>(EnumStatusBarter.EXECUTED)

  const dispatch = (value: EnumStatusBarter) => setState(value)

  return <ContextWrapperCurrentAndCompleted.Provider value={{ state, dispatch }}>{children}</ContextWrapperCurrentAndCompleted.Provider>
}

WrapperCurrentAndCompleted.displayName = "WrapperCurrentAndCompleted"
export default WrapperCurrentAndCompleted

export const useCurrentAndCompleted = () => {
  const context = useContext(ContextWrapperCurrentAndCompleted)

  if (context === undefined) {
    throw new Error("Not Current And Completed")
  }

  return context
}

interface IStateContext {
  state: EnumStatusBarter
  dispatch: Dispatch<EnumStatusBarter>
}
