import { type PropsWithChildren } from "react"

export function PhotoContainer({ children }: PropsWithChildren) {
  return <div data-photo-container>{children}</div>
}
