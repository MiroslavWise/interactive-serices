import { type ReactNode } from "react"

import { ComplaintModal } from "@/components/templates/ComplaintModal"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <ComplaintModal />
        </>
    )
}
