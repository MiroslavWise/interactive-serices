import { create } from "zustand"
import type {
    IUseBalloonCard,
    IActionBalloonCard,
} from "../types/createBalloonCard"

export const useBalloonCard = create<IUseBalloonCard>((set, get) => ({
    visible: false,
    type: undefined,
    id: undefined,
    idUser: undefined,

    dispatch({ visible, id, idUser, type }) {
        const values: IActionBalloonCard = {}

        const getVisible = get().visible
        const getType = get().type
        const getId = get().id
        const getIdUser = get().idUser

        if (visible === false || type === null) {
            values.id = undefined
            values.idUser = undefined
            values.type = undefined
            values.visible = false
            set({
                visible: values.visible,
                type: values.type,
                id: values.id,
                idUser: values.idUser,
            })
            return
        }
        set({
            visible: typeof visible === "undefined" ? getVisible : visible,
            type: typeof type === "undefined" ? getType : type,
            id: typeof id === "undefined" ? getId : id,
            idUser: typeof idUser === "undefined" ? getIdUser : idUser,
        })
    },
}))
