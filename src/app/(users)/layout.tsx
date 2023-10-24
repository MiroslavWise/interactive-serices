import { type ReactNode } from "react"

import {
    NewServicesBanner,
    NewServiceBarterRequests,
} from "@/components/templates"
import { ComplaintModal } from "@/components/templates/ComplaintModal"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <NewServicesBanner />
            <NewServiceBarterRequests />
            <ComplaintModal />
        </>
    )
}
