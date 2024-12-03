import { z } from "zod"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { type IUserResponse } from "@/services/users/types"
import { type TSchemaEmailSignIn } from "@/components/templates/ModalSign/utils/email-sign-in.schema"

import { clg } from "@console"
import { queryClient } from "@/context"
import { NAME_STORAGE_USE_AUTH } from "@/config/persist-name"
import { getLogout, getUser, login, refresh } from "@/services"

export const useAuth = create(
  persist<IStateUseAuth>(
    () => ({
      isAuth: EStatusAuth.CHECK,
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
        } as IStateUseAuth
      },
      version: 0.1,
    },
  ),
)

function setData(res: TAuth | null) {
  useAuth.setState(
    (_) => ({
      ..._,
      auth: res ?? null,
      isAuth: !!res ? EStatusAuth.AUTHORIZED : EStatusAuth.UNAUTHORIZED,
    }),
    true,
  )
}

export async function dispatchLoginTokenData({ email, password }: TSchemaEmailSignIn) {
  const response = await login({ email, password })
  clg("response await", response, "error")
  if (response.ok) {
    setData(response?.res!)
    clg("response setData", response, "error")
    await queryClient
      .fetchQuery({
        queryFn: getUser,
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
  } else {
    setData(null)
  }
  clg("response await end", response, "error")
  return response
}

export const dispatchRefresh = async () => {
  return refresh().then((response) => {
    const { ok, res } = response
    if (ok) {
      useAuth.setState((_) => ({
        ..._,
        auth: res as TAuth,
        isAuth: EStatusAuth.AUTHORIZED,
      }))

      return response
    } else {
      useAuth.setState(
        (_) => ({
          auth: null,
          user: null,
          isAuth: EStatusAuth.UNAUTHORIZED,
        }),
        true,
      )

      return response
    }
  })
}

export const dispatchAuthToken = ({ auth, user }: { auth: TAuth; user: IUserResponse | null }) =>
  useAuth.setState((_) => ({ user, auth, isAuth: EStatusAuth.AUTHORIZED }), true)

export const dispatchClearAuth = async () => {
  return getLogout().then(() => {
    useAuth.setState(
      (_) => ({
        ..._,
        auth: null,
        user: null,
        isAuth: EStatusAuth.UNAUTHORIZED,
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
  isAuth: EStatusAuth
  auth: TAuth | null
  user: IUserResponse | null
}

export function isTokenExpired(exp: number | undefined) {
  if (exp !== undefined) {
    const currentTime: number = Date.now() + new Date().getTimezoneOffset() * 60 * 1000 - 120 * 60 * 1000
    return currentTime - exp > 0
  }
  return false
}

export enum EStatusAuth {
  CHECK = "check",
  AUTHORIZED = "authorized",
  UNAUTHORIZED = "unauthorized",
}
