import { create } from "zustand"
import type {
    IUseBalloonCard,
    IActionBalloonCard,
} from "../types/createBalloonCard"

export const useBalloonCard = create<IUseBalloonCard>((set) => ({
    visible: false,
    type: undefined,
    id: undefined,
    idUser: undefined,

    dispatch({ visible, id, idUser, type }) {
        const values: IActionBalloonCard = {}

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
        set(
            (state) => ({
                visible:
                    typeof visible === "undefined" ? state.visible : visible,
                type: typeof type === "undefined" ? state.type : type,
                id: typeof id === "undefined" ? state.id : id,
                idUser: typeof idUser === "undefined" ? state.idUser : idUser,
            }),
            true,
        )
    },
}))
