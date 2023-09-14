import { type ReactNode, Suspense } from "react"

import { NewServicesBanner } from "@/components/profile"
import { CreateNewOptionModal } from "@/components/profile/CreateNewOptionModal"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Suspense fallback={false}>{children}</Suspense>
            <Suspense fallback={false}>
                <NewServicesBanner />
            </Suspense>
            <Suspense fallback={false}>
                <CreateNewOptionModal />
            </Suspense>
        </>
    )
}
