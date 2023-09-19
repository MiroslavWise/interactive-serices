import { create } from "zustand"

import type { IUseCreateDiscussion } from "../types/createDiscussion"

export const useCreateDiscussion = create<IUseCreateDiscussion>((set, get) => ({
    text: "",
    emotion: undefined,
    stepDiscussion: "start",

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
        })
    },
}))
