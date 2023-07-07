import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

import type { IUseAuth } from "../types/useAuthState"
import { usersService } from "@/services/users"

export const useAuthState = create(
  persist<IUseAuth>(
    (set, get) => ({
      token: undefined,
      refreshToken: undefined,
      userId: undefined,
      profileId: undefined,
      expiration: undefined,
      isAuth: false,
      user: null,

      changeAuth() {
        if (!!get().token && !!get().refreshToken && Number.isFinite(get().userId)) {
          set({ isAuth: true })
          usersService.getUserId(get().userId!)
            .then(response => {
              if (response.ok && !!response?.res?.profile) {
                const { first_name, last_name, username, about, birthdate, enabled, id } = response?.res?.profile ?? {}
                set({
                  user: {
                    firstName: first_name,
                    lastName: last_name,
                    username: username,
                    birthdate: birthdate,
                    about: about,
                    enabled: enabled,
                  },
                  profileId: id,
                })
              }
            })
        }
      },
      setToken({ token, refreshToken, userId, expiration, ok }) {
        if (ok) {
          set({
            token,
            refreshToken,
            userId,
            expiration,
            isAuth: true,
          })
          // AuthService.setAuthData({ token, refreshToken, userId, expiration })
        } else {
          // AuthService.removeAuthData()
        }
      },
      setUser(value) {
        if (value) {
          const {firstName, lastName, username, birthdate, enabled, profileId} = value ?? {}
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
      },
      signOut() {
        set({
          token: undefined,
          refreshToken: undefined,
          userId: undefined,
          expiration: undefined,
          isAuth: false,
          user: null,
          profileId: undefined,
        })
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
)