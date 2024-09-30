import { z } from "zod"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { type IUserResponse } from "@/services/users/types"
import { type TSchemaEmailSignIn } from "@/components/templates/ModalSign/utils/email-sign-in.schema"

import { clg } from "@console"
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

function setData(res: TAuth | null) {
  useAuth.setState(
    (_) => ({
      ..._,
      auth: res ?? null,
      isAuth: !!res,
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
      ;(function () {
        useAuth.setState((_) => ({
          ..._,
          auth: res as TAuth,
          isAuth: true,
        }))
      })()

      return response
    } else {
      ;(function () {
        useAuth.setState(
          (_) => ({
            auth: null,
            user: null,
            isAuth: false,
          }),
          true,
        )
      })()

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
