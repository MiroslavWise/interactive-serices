import { cx } from "@/lib/cx"
import { type ReactNode } from "react"

export interface IPropsChat {
  params: {
    id: number | string
  }
}

interface IProps extends IPropsChat {
  children: ReactNode
  list: ReactNode
  profile: ReactNode
}

export default ({ children, list, profile }: IProps) => {
  return (
    <main
      className={cx(
        "w-full h-screen md:px-6 md:pb-6 md:pt-[calc(var(--height-header-nav-bar)_+_1.5rem)] md:grid md:grid-cols-[21.25rem_minmax(0,1fr)_21.25rem] md:gap-6",
      )}
    >
      {list}
      {children}
      {profile}
    </main>
  )
}
