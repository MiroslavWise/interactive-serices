import { type Metadata } from "next"
import { type PropsWithChildren } from "react"

export const metadata: Metadata = {
  title: "Панель менеджера | Активности",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default ({ children }: PropsWithChildren) => (
  <section className="w-full flex flex-col p-5 gap-7 bg-BG-second h-full ">{children}</section>
)
