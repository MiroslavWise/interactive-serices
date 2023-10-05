import type {
    ISetAction,
    IGetAction,
    IUser,
    ISetToken,
} from "../types/useAuthState"

import { usersService } from "@/services/users"

export const signOutAction = (set: ISetAction) => {
    set({
        token: undefined,
        refreshToken: undefined,
        userId: undefined,
        isAuth: false,
        user: undefined,
        profileId: undefined,
        imageProfile: undefined,
        createdUser: undefined,
        email: undefined,
        addresses: [],
        expires: undefined,
    })
}

export const setUserAction = (
    value: (IUser & { profileId: number }) | null,
    set: ISetAction,
) => {
    if (value) {
        const { firstName, lastName, username, birthdate, enabled, profileId } =
            value ?? {}
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
    const { token, refreshToken, userId, ok, expires } = value ?? {}
    if (ok) {
        set({
            token,
            refreshToken,
            userId,
            expires,
            isAuth: true,
        })
    }
}

export const changeAuthAction = (set: ISetAction, get: IGetAction) => {
    if (
        !!get().token &&
        !!get().refreshToken &&
        Number.isFinite(get().userId)
    ) {
        set({ isAuth: true })
        usersService.getId(get().userId!).then((response) => {
            if (response?.ok) {
                set({
                    createdUser: response?.res?.created!,
                    email: response?.res?.email,
                })
                if (response?.res?.addresses) {
                    set({
                        addresses:
                            response?.res?.addresses?.filter(
                                (item) => item.addressType === "main",
                            ) || [],
                    })
                }
                if (!!response?.res?.profile) {
                    const {
                        firstName,
                        lastName,
                        username,
                        about,
                        birthdate,
                        enabled,
                        id,
                        image,
                    } = response?.res?.profile ?? {}
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
                }
                return
            } else {
                set({ isAuth: false })
            }
        })
    } else {
        set({ isAuth: false })
    }
}
