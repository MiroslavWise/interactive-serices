import { type ReactNode, Suspense } from "react"

import { CreateNewOptionModal, NewServicesBanner } from "@/components/templates"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Suspense fallback={false}>{children}</Suspense>
            <Suspense fallback={false}>
                <NewServicesBanner />
                <CreateNewOptionModal />
            </Suspense>
        </>
    )
}
