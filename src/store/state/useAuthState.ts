import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseAuth } from "../types/useAuthState"

import {
    signOutAction,
    setUserAction,
    setTokenAction,
    changeAuthAction,
    retrieveProfileData,
} from "../action/useAuthAction"

export const useAuthState = create(
    persist<IUseAuth>(
        (set, get) => ({
            email: undefined,
            token: undefined,
            refreshToken: undefined,
            userId: undefined,
            profileId: undefined,
            expiration: undefined,
            isAuth: false,
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
            setUser(value) {
                setUserAction(value, set)
            },
            signOut() {
                signOutAction(set)
            },
            retrieveProfileData() {
                retrieveProfileData(set, get)
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
