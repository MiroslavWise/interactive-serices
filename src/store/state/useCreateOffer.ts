import { create } from "zustand"

import type { IUseCreateOffer } from "../types/useCreateOffer"

export const useCreateOffer = create<IUseCreateOffer>((set, get) => ({
    id: undefined,
    text: "",
    valueCategory: "",
    files: [],
    selectedFilesString: [],

    setId(value) {
        set({ id: value })
    },
    setText(value) {
        set({ text: value })
    },
    setValueCategory(value) {
        set({ valueCategory: value })
    },
    setFiles(value) {
        set({ files: [...get().files, value] })
    },
    setSelectedFilesString(value) {
        set({ selectedFilesString: [...get().selectedFilesString, value] })
    },
    deleteFile(value) {
        const files = get().files.filter((item, index) => index !== value)
        const selectedFilesString = get().selectedFilesString.filter(
            (item, index) => index !== value,
        )
        set({ files: files, selectedFilesString: selectedFilesString })
    },
    reset() {
        set({
            id: undefined,
            text: "",
            files: [],
            valueCategory: "",
            selectedFilesString: [],
        })
    },
}))
