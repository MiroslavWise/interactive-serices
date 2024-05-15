import type { ISetAction, IGetAction, ISetToken, IAuthState } from "../types/useAuthState"

import { getUserId } from "@/services"
import { queryClient } from "@/context"
import { initialStateAuth } from "../state/useAuthState"
import { IUserOffer } from "@/services/offers/types"

export const signOutAction = (set: ISetAction, initialState: IAuthState) => {
  set((state) => ({ ...initialState, isAuth: false }))
}

export const setUserAction = (value: IUserOffer | null, set: ISetAction) => {
  if (value) {
    const { firstName, lastName, username, birthdate, image, id, about, gender } = value ?? {}
    set({
      user: {
        firstName,
        lastName,
        username,
        birthdate,
        image,
        id,
        about,
        gender,
      },
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
        queryFn: () => getUserId(get().userId!),
        queryKey: ["user", { userId: get().userId }],
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
            const { firstName, lastName, username, about, birthdate, id, image, gender } = response?.res?.profile ?? {}
            set({
              user: {
                firstName: firstName,
                lastName: lastName,
                username: username,
                birthdate: birthdate,
                about: about,
                image,
                id,
                gender: gender!,
              },
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
