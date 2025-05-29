interface AppTheme extends WuiTheme {
  // customize your theme
}

declare module "@xstyled/styled-components" {
  export interface Theme extends AppTheme {}
}

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}

declare interface WorkerMessage {
  url: string
  options?: RequestInit
}

declare interface CacheItem<T = any> {
  data: T
  timestamp: number
}

declare interface WorkerResponse {
  status: "success" | "error"
  data?: any
  error?: string
}
