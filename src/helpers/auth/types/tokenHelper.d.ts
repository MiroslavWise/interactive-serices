

interface ILoginArgs{
  email: string
  password: string
}

interface IRefreshToken {
  refresh: string
}

interface IAuthReturn{
  login: boolean

  error?: any
}

export interface IUseTokenHelper {
  async login(value: ILoginArgs): Promise<IAuthReturn>
  async refresh(): Promise<IAuthReturn>
  
  get authToken(): string
  get authRefreshToken(): string
  get isAuth(): boolean
}