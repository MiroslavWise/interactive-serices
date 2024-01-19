"use client"

import { dispatchOuAuth, useAuth } from "@/store/hooks"

export const useOut = () => {
    // const signOut = useAuth(({ signOut }) => signOut)

    function out() {
        dispatchOuAuth()
        // signOut()
    }

    return { out }
}
