import { type ReactNode } from "react"

export default ({ children, profile }: { children: ReactNode; profile: ReactNode }) => (
  <main className="w-full md:grid md:grid-cols-[minmax(0,1fr)_21.25rem] md:gap-6 max-md:max-h-screen max-md:h-full max-md:fixed max-md:inset-0 max-md:z-10">
    {children}
    {profile}
  </main>
)
