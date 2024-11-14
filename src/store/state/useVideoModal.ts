import { create } from "zustand"

export const useVideoModal = create<IState>(() => ({
  visible: false,
}))

export const dispatchVideoStream = (url: string, type: string) =>
  useVideoModal.setState((_) => ({
    visible: true,
    url: url.replace("?format=webp", ""),
    type: type,
  }))

export const dispatchCloseVideoStream = () =>
  useVideoModal.setState((_) => ({
    visible: false,
    url: undefined,
    type: undefined,
  }))

interface IState {
  visible: boolean
  url?: string
  type?: string
}
