import dayjs from "dayjs"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type {
    IUseVisibleAndTypeAuthModalState,
    IAction,
    IActionCreatePassword,
    IUseTimerModalAuth,
} from "../types/useVisibleAndTypeAuthModalState"

export const useModalAuth = create(
    persist<IUseVisibleAndTypeAuthModalState>(
        () => ({
            visible: false,
            type: null,
        }),
        {
            name: "modal-auth",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)

export const useTimerModalAuth = create(
    persist<IUseTimerModalAuth>(() => ({}), { name: "timer-auth-create", storage: createJSONStorage(() => sessionStorage) }),
)

export const dispatchAuthModal = ({ visible, type }: IAction) =>
    useModalAuth.setState((_) => ({
        visible: typeof visible !== "undefined" ? visible : _.visible,
        type: typeof type !== "undefined" ? type : _.type,
    }))

export const dispatchAuthModalCreatePassword = ({ email, phone }: IActionCreatePassword) =>
    useModalAuth.setState((_) => ({
        type: "CreatePassword",
        email: email,
        phone: phone,
    }))

export const dispatchAuthModalVerification = ({}) =>
    useModalAuth.setState((_) => ({
        type: "CodeVerification",
    }))

export const dispatchStartTimer = () =>
    useTimerModalAuth.setState((_) => ({
        time: dayjs().format(),
    }))

export const dispatchIntervalTimer = () => useTimerModalAuth.setState((_) => ({}))
