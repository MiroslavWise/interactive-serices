declare module "ymaps"

declare interface IOnlineSocket {
  clients: string[]
  connections: number
  rooms: string[]
  users: {
    email: string
    id: number
  }[]
}
