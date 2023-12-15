import { create } from "zustand"

import type { TUseIntro } from "../types/createIntro"

export const useIntro = create<TUseIntro>((set, get) => ({
    visible: false,
    page: 0,
}))

export const dispatchPrevIntro = () =>
    useIntro.setState((_) => {
        if (_.page !== 0) {
            return {
                page: _.page - 1,
            }
        }
        return {}
    })

export const dispatchNextIntro = () =>
    useIntro.setState((_) => {
        if (_.page < 6) {
            return {
                page: _.page + 1,
            }
        }
        return {}
    })

export const dispatchIntro = (value: boolean) =>
    useIntro.setState(() => ({
        visible: value,
        page: 0,
    }))

export const dispatchPage = () =>
    useIntro.setState((_) => {
        if (_.page >= 6) {
            return {
                visible: false,
            }
        } else {
            return {
                page: _.page + 1,
            }
        }
    })
