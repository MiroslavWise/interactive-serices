import { type ReactNode } from "react"

import {
    CreateNewOptionModal,
    NewServicesBanner,
    NewServiceBarterRequests,
} from "@/components/templates"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <NewServicesBanner />
            <CreateNewOptionModal />
            <NewServiceBarterRequests />
        </>
    )
}
