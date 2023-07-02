

interface ILoginArgs{
  email: string
  password: string
}

interface IRefreshToken {
  refresh: string
}

interface IAuthReturn{
  login: boolean
  secret?: string
  otp_auth_url?: string
  error?: any
}

interface IOptReturn{
  ok: boolean
  error: any | null
}
export interface IUseTokenHelper {
  private temporaryToken: string

  public async login(value: ILoginArgs): Promise<IAuthReturn>
  public async refresh(): Promise<IAuthReturn>
  public async serviceOtp(value: string | number): Promise<IOptReturn>
  
  get authToken(): string
  get authRefreshToken(): string
  get isAuth(): boolean
}