import { type IMetaData } from "@/services/types/general"

declare module "ymaps"

export interface IOnlineSocket {
  clients: string[]
  connections: number
  rooms: string[]
  users: {
    email: string
    id: number
  }[]
}
