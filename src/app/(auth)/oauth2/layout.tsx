import { type Metadata } from "next"
import { type ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    default: "Авторизация",
    template: "%s | Авторизация",
  },
  openGraph: {
    title: {
      default: "Авторизация",
      template: "%s | Авторизация",
    },
  },
}

export default ({ children }: { children: ReactNode }) => children
