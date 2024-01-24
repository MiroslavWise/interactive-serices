"use client"

import { useAuth } from "@/store"

export const useOut = () => {
    const signOut = useAuth(({ signOut }) => signOut)

    function out() {
        signOut()
    }

    return { out }
}
