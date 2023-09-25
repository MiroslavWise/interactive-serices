import { create } from "zustand"

import type { IUseCreateAlert } from "../types/createAlert"

export const useCreateAlert = create<IUseCreateAlert>((set, get) => ({
    text: "",
    emotion: undefined,
    stepAlert: "start",
    files: [],
    selectedFile: [],
    addressInit: null,

    setAddressInit(value) {
        set({ addressInit: value })
    },
    setFile(value) {
        set({ files: [...get().files, value] })
    },
    setSelectedFile(value) {
        set({ selectedFile: [...get().selectedFile, value] })
    },
    setStepAlert(value) {
        set({ stepAlert: value })
    },
    setText(value) {
        set({ text: value })
    },
    setEmotion(value) {
        set({ emotion: value })
    },
    resetAlert() {
        set({
            text: "",
            emotion: undefined,
            stepAlert: "start",
            addressInit: null,
        })
    },
}))
