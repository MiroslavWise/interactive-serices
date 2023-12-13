import { create } from "zustand"

import type { TUseIntro } from "../types/createIntro"

export const useIntro = create<TUseIntro>((set, get) => ({
    visible: false,
    page: 1,
}))

export const dispatchIntro = (value: boolean) =>
    useIntro.setState(() => ({
        visible: value,
    }))
