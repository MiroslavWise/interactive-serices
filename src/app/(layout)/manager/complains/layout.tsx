import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Список жалоб",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default ({ children }: { children: React.ReactNode }) => (
  <section className="w-full flex flex-col p-5 gap-7 bg-BG-second h-full">{children}</section>
)
