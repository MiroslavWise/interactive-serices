import { create } from "zustand"

import type { IUseCreateOffer } from "../types/createOffer"

export const useCreateOffer = create<IUseCreateOffer>((set, get) => ({
    id: undefined,
    text: "",
    valueCategory: undefined,
    files: [],
    selectedFile: [],
    adressId: undefined,
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
    setId(value) {
        set({ id: value })
    },
    setText(value) {
        set({ text: value })
    },
    setValueCategory(value) {
        set({ valueCategory: value })
    },
    setFile(value) {
        set({ files: [...get().files, value] })
    },
    setSelectedFile(value) {
        set({ selectedFile: [...get().selectedFile, value] })
    },
    deleteFile(value) {
        const files = get().files.filter((item, index) => index !== value)
        const selectedFilesString = get().selectedFile.filter(
            (item, index) => index !== value,
        )
        set({ files: files, selectedFile: selectedFilesString })
    },
    reset() {
        set({
            id: undefined,
            text: "",
            files: [],
            valueCategory: undefined,
            selectedFile: [],
            addressInit: undefined,
            adressId: undefined,
        })
    },
}))
