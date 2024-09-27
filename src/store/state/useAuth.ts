import { z } from "zod"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { type IUserResponse } from "@/services/users/types"
import { type TSchemaEmailSignIn } from "@/components/templates/ModalSign/utils/email-sign-in.schema"

import { queryClient } from "@/context"
import { getLogout, getUser, login, refresh } from "@/services"

const NAME_STORAGE_USE_AUTH = "::---sheira-auth---::"
export const useAuth = create(
  persist<IStateUseAuth>(
    () => ({
      auth: null,
      user: null,
    }),
    {
      name: NAME_STORAGE_USE_AUTH,
      storage: createJSONStorage(() => localStorage),
      partialize(state) {
        return {
          auth: state.auth,
          user: state.user,
        }
      },
      version: 0.1,
    },
  ),
)

export const dispatchLoginTokenData = async ({ email, password }: TSchemaEmailSignIn) => {
  return login({ email, password }).then((response) => {
    if (response.ok) {
      useAuth.setState((_) => ({
        ..._,
        auth: response.res,
        isAuth: true,
      }))

      queryClient
        .fetchQuery({
          queryFn: () => getUser(),
          queryKey: ["user", { userId: response?.res?.id! }],
        })
        .then(({ data }) => {
          if (!!data) {
            useAuth.setState((_) => ({
              ..._,
              user: data,
            }))
          }
        })

      return response
    } else {
      useAuth.setState((_) => ({
        ..._,
        auth: null,
        isAuth: false,
      }))
      return response
    }
  })
}

export const dispatchRefresh = async () => {
  return refresh().then((response) => {
    const { ok, res } = response
    if (ok) {
      useAuth.setState((_) => ({
        ..._,
        auth: res as TAuth,
        isAuth: true,
      }))

      return response
    } else {
      useAuth.setState(
        (_) => ({
          auth: null,
          user: null,
          isAuth: false,
        }),
        true,
      )

      return response
    }
  })
}

export const dispatchAuthToken = ({ auth, user }: { auth: TAuth; user: IUserResponse | null }) =>
  useAuth.setState((_) => ({ user, auth, isAuth: true }), true)

export const dispatchClearAuth = async () => {
  return getLogout().then(() => {
    useAuth.setState(
      (_) => ({
        ..._,
        auth: null,
        user: null,
        isAuth: false,
      }),
      true,
    )
  })
}

const objUseAuth = z.object({
  accessToken: z.string(),
  expires: z.number(),
  expiresIn: z.number().default(7200),
  id: z.number(),
  refreshToken: z.string(),
  scope: z.string(),
  tokenType: z.string().default("Bearer"),
  counter: z.number(),
  email: z.string(),
})

export type TAuth = z.infer<typeof objUseAuth>

interface IStateUseAuth {
  isAuth?: boolean
  auth: TAuth | null
  user: IUserResponse | null
}

export function isTokenExpired(exp: number | undefined) {
  if (exp !== undefined) {
    const currentTime: number = Date.now()
    return currentTime - exp > 0
  }
  return false
}
