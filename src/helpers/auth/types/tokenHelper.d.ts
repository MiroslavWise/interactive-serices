

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
  async refresh(value: IRefreshToken): Promise<IAuthReturn>
  
  get AuthData(): {
    token: string
    refresh: string
  }
  get isAuth(): boolean
}