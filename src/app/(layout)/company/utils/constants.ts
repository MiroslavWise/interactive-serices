export enum ELinkCompany {
  MAIN = "",
  USERS = "/users",
}

export type TLinkCompany = `/company${ELinkCompany}`

export interface ILink {
  label: string
  path: TLinkCompany
}

export const LINKS: ILink[] = [
  {
    label: "Информация",
    path: "/company",
  },
  {
    label: "Список аккаунтов",
    path: "/company/users",
  },
]
