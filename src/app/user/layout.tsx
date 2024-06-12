import { type ReactNode } from "react"

export default function LayoutProfileId({ children }: { children: ReactNode }) {
  return (
    <main className="h-full w-full overflow-hidden bg-transparent p-0 md:pt-[calc(var(--height-header-nav-bar)_+_1.5rem)] md:pb-[1.25rem] px-0 flex flex-row justify-center z-[4] relative md:static">
      {children}
    </main>
  )
}
