import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseAuth } from "../types/useAuthState"

import {
    signOutAction,
    setUserAction,
    setTokenAction,
    changeAuthAction,
} from "../action/useAuthAction"

import { AuthService } from "@/services/auth/authService"

export const useAuth = create(
    persist<IUseAuth>(
        (set, get) => ({
            email: undefined,
            token: undefined,
            refreshToken: undefined,
            userId: undefined,
            expires: undefined,
            profileId: undefined,
            isAuth: undefined,
            user: undefined,
            imageProfile: undefined,
            createdUser: undefined,
            addresses: [],

            changeAuth() {
                changeAuthAction(set, get)
            },
            setToken(value) {
                setTokenAction(value, set)
            },
            getUser(value) {
                setUserAction(value, set)
            },
            signOut() {
                signOutAction(set)
            },

            refresh() {
                const refreshToken = get().refreshToken
                const email = get().email
                const expires = get().expires
                console.log("refresh: ", isTokenExpired(expires))
                if (
                    !isTokenExpired(get().expires) &&
                    typeof expires === "number"
                ) {
                    changeAuthAction(set, get)
                    return
                }
                if (typeof refreshToken !== "string") {
                    set({
                        email: undefined,
                        token: undefined,
                        refreshToken: undefined,
                        userId: undefined,
                        expires: undefined,
                        profileId: undefined,
                        isAuth: false,
                        user: undefined,
                        imageProfile: undefined,
                        createdUser: undefined,
                    })
                    return
                }
                if (
                    typeof expires === "number" &&
                    isTokenExpired(expires) &&
                    typeof refreshToken === "string"
                ) {
                    return AuthService
                        .refresh({
                            email: email!,
                            refreshToken: refreshToken!,
                        })
                        .then((response) => {
                            if (response.ok) {
                                set({
                                    isAuth: true,
                                    token: response?.res?.accessToken!,
                                    expires: response?.res?.expires!,
                                    userId: response?.res?.id!,
                                })
                                changeAuthAction(set, get)
                            } else {
                                set({ isAuth: false })
                            }
                        })
                }
                set({
                    email: undefined,
                    token: undefined,
                    refreshToken: undefined,
                    userId: undefined,
                    expires: undefined,
                    profileId: undefined,
                    isAuth: false,
                    user: undefined,
                    imageProfile: undefined,
                    createdUser: undefined,
                })
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
            partialize(state) {
                return {
                    email: state.email,
                    token: state.token,
                    expires: state.expires,
                    refreshToken: state.refreshToken,
                    userId: state.userId,
                    profileId: state.profileId,
                    user: state.user,
                    imageProfile: state.imageProfile,
                    createdUser: state.createdUser,
                    addresses: state.addresses,
                } as IUseAuth
            },
        },
    ),
)

function isTokenExpired(exp: number | undefined) {
    if (exp !== undefined) {
        const currentTime: number = Date.now()
        return exp < currentTime
    }
}
