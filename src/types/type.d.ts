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

export interface IImageData {
  id: number
  attributes: {
    alt: string
    caption: string
    ext: string
    hash: string
    height: number
    mime: string
    name: string
    provider: string
    size: number
    url: string
    width: number
  }
}
