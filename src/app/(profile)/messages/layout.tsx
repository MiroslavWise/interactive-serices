import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Сообщения",
  openGraph: { title: "Сообщения" },
  twitter: { title: "Сообщения" },
}

export default ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full md:px-5 md:grid md:gap-5 md:z-40 md:grid-cols-[25rem_1fr_18.75rem] relative md:static inset-0">
    {children}
  </div>
)
