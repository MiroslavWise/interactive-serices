import { type ReactNode, Suspense } from "react"

import { NewServicesBanner } from "@/components/profile"
import { CreateNew } from "@/components/profile/CreateNew"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Suspense fallback={false}>{children}</Suspense>
            <Suspense fallback={false}>
                <NewServicesBanner />
            </Suspense>
            <Suspense fallback={false}>
                <CreateNew />
            </Suspense>
        </>
    )
}
