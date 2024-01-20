import { create } from "zustand"
import { TActionDispatch, TUseProfilePublic } from "../types/createProfilePublic"

export const useProfilePublic = create<TUseProfilePublic>((set, get) => ({
    visibleProfilePublic: false,

    dispatchProfilePublic({ visible, idUser, isLeft }) {
        if (!idUser) {
            set({ idUser: undefined })
        }
        if (typeof isLeft !== "undefined") {
            set({ isLeft: isLeft })
        }
        set({
            visibleProfilePublic: visible,
            idUser: idUser,
        })
    },
}))

export const dispatchProfilePublic: TActionDispatch = (values) =>
    useProfilePublic.setState((_) => ({
        visibleProfilePublic: values.visible,
        idUser: values.idUser,
    }))
