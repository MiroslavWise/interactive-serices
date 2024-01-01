import dayjs from "dayjs"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type {
    IUseVisibleAndTypeAuthModalState,
    IAction,
    IActionCreatePassword,
    IUseTimerModalAuth,
    IUseModalAuthEmailOrPhone,
    TTypeEmailOrNumber,
    IActionAuthModalVerification,
} from "../types/useVisibleAndTypeAuthModalState"
import { IUserResponse } from "@/services/users/types/usersService"

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
export const useModalAuthEmailOrPhone = create(
    persist<IUseModalAuthEmailOrPhone>(() => ({ typeEmailOrPhone: "email" }), {
        name: "email-or-phone-state",
        storage: createJSONStorage(() => localStorage),
    }),
)

export const dispatchIModalAuthEmailOrPhone = (value: TTypeEmailOrNumber) =>
    useModalAuthEmailOrPhone.setState((_) => ({
        typeEmailOrPhone: value,
    }))

export const dispatchAuthModal = ({ visible, type, email }: IAction) =>
    useModalAuth.setState((_) => ({
        visible: typeof visible !== "undefined" ? visible : _.visible,
        type: typeof type !== "undefined" ? type : _.type,
        email: typeof email !== "undefined" ? email : _.email,
    }))

export const dispatchAuthModalResetPassword = (value: string) =>
    useModalAuth.setState((_) => ({
        visible: true,
        type: "ResetPassword",
        codeReset: value,
    }))
export const dispatchAuthModalInformationCreateAccount = (value: string) =>
    useModalAuth.setState((_) => ({
        visible: true,
        type: "InformationCreateAccount",
        email: value,
    }))

export const dispatchAuthModalCreatePassword = ({ email, phone }: IActionCreatePassword) =>
    useModalAuth.setState((_) => ({
        type: "CreatePassword",
        email: email,
        phone: phone,
    }))

export const dispatchAuthModalVerification = ({ confirmationCode, id }: IActionAuthModalVerification) =>
    useModalAuth.setState((_) => ({
        verification: { confirmationCode, id },
        type: "CodeVerification",
    }))

export const dispatchStartTimer = () =>
    useTimerModalAuth.setState((_) => ({
        time: dayjs().format(),
    }))

export const dispatchIntervalTimer = () => useTimerModalAuth.setState((_) => ({}))

export const dispatchAuthModalCurrentUser = ({ user }: { user?: IUserResponse }) =>
    useModalAuth.setState((_) => ({
        type: !!user ? "CurrentUser" : null,
        visible: !!user ? true : false,
        user: user,
    }))
