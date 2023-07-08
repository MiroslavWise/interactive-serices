import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

import type { IUseAuth } from "../types/useAuthState"
import { usersService } from "@/services/users"

import {
  signOutAction,
  setUserAction,
  setTokenAction,
  changeAuthAction,
} from "../action/useAuthAction"

export const useAuthState = create(
  persist<IUseAuth>(
    (set, get) => ({
      token: undefined,
      refreshToken: undefined,
      userId: undefined,
      profileId: undefined,
      expiration: undefined,
      isAuth: false,
      user: undefined,

      changeAuth() { changeAuthAction(set, get) },
      setToken(value) { setTokenAction(value, set) },
      setUser(value) { setUserAction(value, set) },
      signOut() { signOutAction(set) },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
)