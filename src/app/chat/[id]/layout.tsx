import { ReactNode } from "react"

export default ({ children, profile }: { children: ReactNode; profile: ReactNode }) => (
  <main className="w-full md:grid md:grid-cols-[minmax(0,1fr)_21.25rem] md:gap-6">
    {children}
    {profile}
  </main>
)
