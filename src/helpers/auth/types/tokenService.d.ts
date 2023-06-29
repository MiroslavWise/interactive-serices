
export type TSuffix = "Token" | "RefreshToken" | "Expiration"

export interface ISaveToken {
  token: string | null
  refreshToken: string | null
  ok: boolean
}

export interface IRefreshToken {
  token: string | null
  refreshToken: string | null
  ok: boolean
}