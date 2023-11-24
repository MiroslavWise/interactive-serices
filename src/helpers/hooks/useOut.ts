"use client"

import { useAuth } from "@/store/hooks"

export const useOut = () => {
    const signOut = useAuth((_) => _.signOut)

    function out() {
        signOut()
    }

    return { out }
}
