import type { ISetAction, IGetAction, IUser, ISetToken, IAuthState } from "../types/useAuthState"

import { serviceUsers } from "@/services/users"
import { initialStateAuth } from "../state/useAuthState"
import { queryClient } from "@/context"

export const signOutAction = (set: ISetAction, initialState: IAuthState) => {
    set((state) => ({ ...initialState, isAuth: false }))
}

export const setUserAction = (value: (IUser & { profileId: number }) | null, set: ISetAction) => {
    if (value) {
        const { firstName, lastName, username, birthdate, enabled, profileId } = value ?? {}
        set({
            user: {
                firstName: firstName,
                lastName: lastName,
                username: username,
                birthdate: birthdate,
                enabled: enabled,
            },
            profileId: profileId,
        })
    }
}

export const setTokenAction = (value: ISetToken, set: ISetAction) => {
    const { token, refreshToken, userId, ok, expires, email } = value ?? {}
    if (ok) {
        set({
            token,
            refreshToken,
            userId,
            expires,
            email,
            isAuth: true,
        })
    }
}

export const changeAuthAction = (set: ISetAction, get: IGetAction) => {
    if (!!get().token && !!get().refreshToken && !!get().userId) {
        queryClient
            .fetchQuery({
                queryFn: () => serviceUsers.getId(get().userId!),
                queryKey: ["user", get().userId],
            })
            .then((response) => {
                if (response?.ok) {
                    set({
                        createdUser: response?.res?.created!,
                        email: response?.res?.email,
                        isAuth: true,
                    })
                    if (response?.res?.addresses) {
                        set({
                            addresses: response?.res?.addresses?.filter((item) => item.addressType === "main") || [],
                        })
                    }
                    if (!!response?.res?.profile) {
                        const { firstName, lastName, username, about, birthdate, enabled, id, image } = response?.res?.profile ?? {}
                        set({
                            user: {
                                firstName: firstName,
                                lastName: lastName,
                                username: username,
                                birthdate: birthdate,
                                about: about,
                                enabled: enabled,
                            },
                            profileId: id,
                            imageProfile: image || undefined,
                        })
                        set({ isAuth: true })
                    }
                    return
                } else {
                    set((state) => ({
                        ...state,
                        ...initialStateAuth,
                        isAuth: false,
                    }))
                    set({ isAuth: false })
                }
            })
    } else {
        set((state) => ({ ...state, ...initialStateAuth, isAuth: false }))
    }
}
