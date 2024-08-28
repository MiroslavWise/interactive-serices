import { create } from "zustand"

export const useDraftChat = create<IState>(() => ({}))

export const dispatchMessageDraft = (id: number | string, value: string | null) =>
  useDraftChat.setState(
    (_) => ({
      ..._,
      [id]: value,
    }),
    true,
  )

interface IState {
  [key: string | number]: string | null
}
