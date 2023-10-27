import { create } from "zustand"
import { TUseProfilePublic } from "../types/createProfilePublic"

export const useProfilePublic = create<TUseProfilePublic>((set, get) => ({
    visibleProfilePublic: false,

    dispatchProfilePublic({ visible, idUser }) {
        set({
            visibleProfilePublic: visible,
            idUser: idUser,
        })
    },
}))
