import { type PropsWithChildren } from "react"

import List from "./components-list/Page"

export default ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full relative h-screen md:px-6 md:pb-6 md:pt-[calc(var(--height-header-nav-bar)_+_1.5rem)] md:grid md:grid-cols-[21.25rem_minmax(0,1fr)] md:gap-6">
      <List />
      {children}
    </main>
  )
}
