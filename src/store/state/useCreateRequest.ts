import { create } from "zustand"

import type { IUseCreateRequest } from "../types/createRequest"

export const useCreateRequest = create<IUseCreateRequest>((set, get) => ({
    text: "",
    selected: undefined,
    stepRequest: "start",

    setStepRequest(value) {
        set({ stepRequest: value })
    },
    setText(value) {
        set({ text: value })
    },
    setValueCategory(value) {
        set({ selected: value })
    },
    resetRequest() {
        set({
            text: "",
            selected: undefined,
            stepRequest: "start",
        })
    },
}))
