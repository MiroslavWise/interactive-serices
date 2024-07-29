declare module "ymaps"
import { type IMetaData } from "@/services/types/general"

export interface IOnlineSocket {
  clients: string[]
  connections: number
  rooms: string[]
  users: {
    email: string
    id: number
  }[]
}
