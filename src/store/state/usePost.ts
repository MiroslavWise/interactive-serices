import { create } from "zustand"

import { type IPosts } from "@/services/posts/types"

import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const usePost = create<{ visible: boolean }>(() => ({ visible: false }))
export const useCreateNewNote = create<IStateNote>(() => ({
  data: null,
}))
export const useBalloonPost = create<IStateBalloonPost>(() => ({
  data: null,
}))

export const dispatchUsePost = (value: boolean) => {
  if (value) {
    dispatchModal(EModalData.CREATE_POST)
  } else {
    dispatchModalClose()
  }
}

export function dispatchBallonPost(value: IPosts | null) {
  if (value) {
    useBalloonPost.setState((_) => ({ data: value }), true)
    dispatchModal(EModalData.BALLOON_POST)
  } else {
    useBalloonPost.setState((_) => ({ data: null }), true)
    dispatchModalClose()
  }
}

export const dispatchOpenCreateNote = (id: number, title: string) => {
  dispatchModal(EModalData.CREATE_NEW_NOTE)
  useCreateNewNote.setState(
    (_) => ({
      data: {
        id: id,
        title: title,
      },
    }),
    true,
  )
}

interface IStateBalloonPost {
  data: IPosts | null
}

interface IStateNote {
  data: {
    id: number
    title: string
  } | null
}
