import { create } from "zustand"

import type { IUseCreateRequest } from "../types/createRequest"

export const useCreateRequest = create<IUseCreateRequest>((set, get) => ({
    text: "",
    selected: undefined,
    stepRequest: "start",
    adressId: undefined,
    files: [],
    selectedFile: [],
    addressInit: undefined,

    setAddressInit(value) {
        set({ addressInit: value })
    },
    setAddressId({ id }) {
        set({
            adressId: {
                id: id,
            },
        })
    },
    setStepRequest(value) {
        set({ stepRequest: value })
    },
    setText(value) {
        set({ text: value })
    },
    setValueCategory(value) {
        set({ selected: value })
    },
    setFile(value) {
        set({ files: [...get().files, value] })
    },
    setSelectedFile(value) {
        set({ selectedFile: [...get().selectedFile, value] })
    },
    resetRequest() {
        set({
            text: "",
            selected: undefined,
            stepRequest: "start",
            addressInit: undefined,
            adressId: undefined,
            files: [],
            selectedFile: [],
        })
    },
}))
