import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IAuthState, TUseAuth } from "../types/useAuthState"
import type { IResponseLoginNot2fa } from "@/services/auth/types/authService"

import { queryClient } from "@/context"
import { serviceProfile, AuthService, getSession } from "@/services"
import { signOutAction, setUserAction, setTokenAction, changeAuthAction } from "../action/useAuthAction"

export const initialStateAuth: IAuthState = {
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
  addresses: undefined,
}

export const useAuth = create(
  persist<TUseAuth>(
    (set, get) => ({
      ...initialStateAuth,
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
        signOutAction(set, initialStateAuth)
      },
      updateProfile() {
        queryClient
          .fetchQuery({
            queryFn: () => serviceProfile.getUserId(get().userId!),
            queryKey: ["profile", get().userId!],
          })
          .then((response) => {
            if (response?.ok) {
              if (!!response?.res) {
                const data = response?.res
                set({
                  user: {
                    firstName: data.firstName,
                    lastName: data?.lastName,
                    username: data?.username,
                    birthdate: data?.birthdate as Date | string,
                    about: data?.about,
                    image: data?.image,
                    id: data?.id,
                    gender: data?.gender!,
                  },
                })
              }
            }
          })
      },

      async refresh() {
        const refreshToken = get().refreshToken
        const email = get().email
        const expires = get().expires

        if (!isTokenExpired(get().expires) && typeof expires === "number") {
          changeAuthAction(set, get)
          return {
            ok: false,
          }
        }
        if (typeof refreshToken !== "string") {
          set((state) => ({
            ...state,
            ...initialStateAuth,
            isAuth: false,
          }))
          return {
            ok: false,
          }
        }
        if (typeof expires === "number" && isTokenExpired(expires) && typeof refreshToken === "string") {
          return AuthService.refresh({
            email: email!,
            refreshToken: refreshToken!,
          }).then((response) => {
            if (response.ok) {
              set({
                isAuth: true,
                token: response?.res?.accessToken!,
                expires: response?.res?.expires!,
                userId: response?.res?.id!,
              })
              changeAuthAction(set, get)
              return {
                ok: true,
              }
            } else {
              set((state) => ({
                ...state,
                ...initialStateAuth,
                isAuth: false,
              }))
              return {
                ok: false,
              }
            }
          })
        }

        set((state) => ({
          ...state,
          ...initialStateAuth,
          isAuth: false,
        }))
        return { ok: false }
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
        } as TUseAuth
      },
    },
  ),
)

export const dispatchAuthToken = (values: IResponseLoginNot2fa & { email: string }) =>
  useAuth.setState((_) => {
    const { accessToken, refreshToken, id, expires, email } = values ?? {}

    return {
      token: accessToken,
      refreshToken,
      userId: id,
      expires,
      email,
      isAuth: true,
    }
  })

function isTokenExpired(exp: number | undefined) {
  if (exp !== undefined) {
    const currentTime: number = Date.now()
    return exp < currentTime
  }
}
