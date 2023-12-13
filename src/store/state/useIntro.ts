import { create } from "zustand"

import type { TUseIntro } from "../types/createIntro"

export const useIntro = create<TUseIntro>((set, get) => ({
    visible: false,
    page: 0,
}))

export const dispatchIntro = (value: boolean) =>
    useIntro.setState(() => ({
        visible: value,
        page: 0,
    }))

export const dispatchPage = () =>
    useIntro.setState((_) => {
        if (_.page >= 5) {
            return {
                visible: false,
                page: 0,
            }
        } else {
            return {
                page: _.page + 1,
            }
        }
    })
