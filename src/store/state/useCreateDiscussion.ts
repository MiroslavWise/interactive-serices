import { create } from "zustand"

import type { IUseCreateDiscussion } from "../types/createDiscussion"

export const useCreateDiscussion = create<IUseCreateDiscussion>((set, get) => ({
    text: "",
    emotion: undefined,
    stepDiscussion: "start",
    files: [],
    selectedFile: [],
    addressInit: null,
    adressId: undefined,

    setAddressId({ id }) {
        set({
            adressId: {
                id: id,
            },
        })
    },
    setAddressInit(value) {
        set({ addressInit: value })
    },
    setFile(value) {
        set({ files: [...get().files, value] })
    },
    setSelectedFile(value) {
        set({ selectedFile: [...get().selectedFile, value] })
    },

    setStepDiscussion(value) {
        set({ stepDiscussion: value })
    },
    setText(value) {
        set({ text: value })
    },
    setEmotion(value) {
        set({ emotion: value })
    },
    resetDiscussion() {
        set({
            text: "",
            emotion: undefined,
            stepDiscussion: "start",
            addressInit: null,
        })
    },
}))
