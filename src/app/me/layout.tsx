import { type ReactNode } from "react"

import { cx } from "@/lib/cx"

export interface IPropsMe {
  profile: ReactNode
  children: ReactNode
  history: ReactNode
}

export default ({ profile, children, history }: IPropsMe) => (
  <main
    className={cx(
      "w-full h-screen md:h-full bg-transparent p-0",
      "md:overflow-hidden md:pt-[calc(var(--height-header-nav-bar)_+_1.5rem)] md:pb-5 md:px-6 z-[4] md:static md:grid md:grid-cols-[17.125rem_minmax(0,1fr)_25rem] md:gap-6",
      "overflow-x-hidden overflow-y-auto px-0.625 pt-0.625 max-md:flex max-md:flex-col max-md:gap-0.625 max-md:pb-[calc(var(--height-mobile-footer-nav)_+_0.625rem)]",
    )}
  >
    {profile}
    {children}
    {history}
  </main>
)
