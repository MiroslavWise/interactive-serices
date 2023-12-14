import { type ReactNode } from "react"

export function PhotoContainer({ children }: { children: ReactNode }) {
    return <div data-photo-container>{children}</div>
}
