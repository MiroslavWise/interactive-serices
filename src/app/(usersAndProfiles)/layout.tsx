import { type ReactNode } from "react"

import { NewServicesBanner } from "@/components/profile"
import { CreateNew } from "@/components/profile/CreateNew"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <NewServicesBanner />
            <CreateNew />
        </>
    )
}
