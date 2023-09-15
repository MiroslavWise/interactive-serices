import { Suspense } from "react"

import { OffersPage } from "@/components/profile"

export default function Offers() {
    return (
        <Suspense fallback={false}>
            <OffersPage />
        </Suspense>
    )
}
