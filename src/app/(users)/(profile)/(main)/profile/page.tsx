import { Suspense } from "react"

import { MyProfilePage } from "@/components/profile"

export default function Profile() {
    return (
        <Suspense fallback={false}>
            <MyProfilePage />
        </Suspense>
    )
}
