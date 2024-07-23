import { EnumProviderThreads } from "@/types/enum"
import { create } from "zustand"

export const useSelectChat = create<IState>(() => ({ select: "all" }))

export const dispatchSelectChat = (value: EnumProviderThreads | "all") =>
  useSelectChat.setState(
    () => ({
      select: value,
    }),
    true,
  )

interface IState {
  select: EnumProviderThreads | "all"
}
