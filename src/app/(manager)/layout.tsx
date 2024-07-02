import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Панель менеджера",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default ({ children }: { children: React.ReactNode }) => children
