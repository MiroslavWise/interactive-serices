"use client"

import { useAuth } from "@/store/hooks"

export const useOut = () => {
    const signOut = useAuth(({ signOut }) => signOut)

    function out() {
        signOut()
    }

    return { out }
}
