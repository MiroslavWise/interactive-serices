import type { ISetAction, IGetAction, IUser, ISetToken } from "../types/useAuthState"

import { usersService } from "@/services/users"

export const signOutAction = (set: ISetAction) => {
  set({
    token: undefined,
    refreshToken: undefined,
    userId: undefined,
    expiration: undefined,
    isAuth: false,
    user: undefined,
    profileId: undefined,
  })
}

export const setUserAction = (value: IUser & { profileId: number } | null, set: ISetAction) => {
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
  const { token, refreshToken, userId, expiration, ok } = value ?? {}
  if (ok) {
    set({
      token,
      refreshToken,
      userId,
      expiration,
      isAuth: true,
    })
  }
}

export const changeAuthAction = (set: ISetAction, get: IGetAction) => {
  if (!!get().token && !!get().refreshToken && Number.isFinite(get().userId)) {
    set({ isAuth: true })
    usersService.getUserId(get().userId!)
      .then(response => {
        if (response.ok && !!response?.res?.profile) {
          const { firstName, lastName, username, about, birthdate, enabled, id } = response?.res?.profile ?? {}
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
          })
        }
      })
  }
}