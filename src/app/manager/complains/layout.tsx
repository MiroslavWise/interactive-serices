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
  <main className="h-full w-full overflow-hidden bg-transparent p-0 md:pt-[calc(var(--height-header-nav-bar)_+_1.5rem)] md:pb-[1.25rem] px-0 flex flex-row justify-center z-[4] relative md:static overflow-y-auto not-y-scroll">
    {children}
  </main>
)
