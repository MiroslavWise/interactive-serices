import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export const useDraftChat = create(
  persist<IState>(() => ({}), {
    name: "::draft::chat::",
    storage: createJSONStorage(() => localStorage),
    version: 1,
  }),
)

function crypted(str: string | null) {
  if (!str) return null
  return str
    .split("")
    .map((value) => value.charCodeAt(0))
    .join(",")
}
export function deCrypted(str: string | null) {
  if (!str) return null
  return str
    .split(",")
    .map((value) => String.fromCharCode(Number(value)))
    .join("")
}

export const dispatchMessageDraft = (id: number | string, value: string | null) => {
  useDraftChat.setState((_) => ({
    [id]: crypted(value),
  }))
}

interface IState {
  [key: string | number]: string | null
}
