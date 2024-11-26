import { create } from "zustand"

import { type IPosts } from "@/services/posts/types"
import { type INotes } from "@/services/notes/types"

import { clg } from "@console"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"
import { TPostAddress } from "@/services/addresses/types/geocodeSearch"
import { useNewServicesBannerMap } from "./useNewServicesBanner"

export const useUpdatePost = create<IStateBalloonPost>(() => ({ data: null }))
export const useCreatePost = create<{ initAddress?: TPostAddress }>(() => ({}))
export const useCreateNewNote = create<IStateNote>(() => ({ data: null }))
export const useBalloonPost = create<IStateBalloonPost>(() => ({ data: null }))
export const useDeleteNote = create<IStateUserDelete>(() => ({ data: null }))
export const useArchivePost = create<IStateArchivePost>(() => ({ data: null }))

export const dispatchUpdatePost = (value?: IPosts) => {
  useUpdatePost.setState(
    (_) => ({
      data: value ?? null,
    }),
    true,
  )
}

export const dispatchArchivePost = (value?: IPosts) => {
  clg("dispatchArchivePost: ", value, "warning")
  useArchivePost.setState(
    (_) => ({
      data: value ?? null,
    }),
    true,
  )
}

export const dispatchDeleteNote = (value?: INotes) => {
  clg("dispatchDeleteNote: ", value, "warning")
  useDeleteNote.setState(
    (_) => ({
      data: value ?? null,
    }),
    true,
  )
}

export const dispatchCreatePost = (value: boolean) => {
  if (value) {
    dispatchModal(EModalData.CREATE_POST)
  } else {
    dispatchModalClose()
  }
}

export const dispatchCreatePostMap = (init?: TPostAddress) => {
  if (init) {
    useCreatePost.setState(
      (_) => ({
        initAddress: init,
      }),
      true,
    )
    dispatchModal(EModalData.CREATE_POST_MAP)
  } else {
    dispatchModalClose()
    dispatchClearInitCreatePostMap()
  }
}

export const dispatchClearInitCreatePostMap = () => {
  useCreatePost.setState(() => ({ initAddress: undefined }), true)
  useNewServicesBannerMap.setState(() => ({ addressInit: undefined }), true)
}

export function dispatchBallonPostUpdate(value: Partial<IPosts>) {
  useBalloonPost.setState(
    (_) => ({
      data: {
        ..._.data!,
        ...value,
      },
    }),
    true,
  )
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

export const dispatchCloseCreateNote = () => {
  dispatchModalClose()
  useCreateNewNote.setState(() => ({
    data: null,
  }))
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

interface IStateUserDelete {
  data: INotes | null
}

interface IStateArchivePost {
  data: IPosts | null
}
