import { create } from "zustand"

import type { IUseCreateAlert } from "../types/createAlert"

export const useCreateAlert = create<IUseCreateAlert>((set, get) => ({
    text: "",
    emotion: undefined,
    stepAlert: "start",

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
        })
    },
}))
