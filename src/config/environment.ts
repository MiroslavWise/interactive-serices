const env: IEnv = {
  server: {
    host: process.env.NEXT_PUBLIC_URL!,
    port: Number(process.env.PORT!),
  },
  websocket: process.env.NEXT_PUBLIC_WEB_SOCKET!,
  auto_verification: Boolean(process.env.NEXT_PUBLIC_AUTO_VERIFICATION),
}

export default env

interface IEnv {
  server: {
    host: string
    port: number
  }
  websocket: string
  auto_verification: boolean
}