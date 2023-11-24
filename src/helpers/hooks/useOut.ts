"use client"

import { useAuth } from "@/store/hooks"

export const useOut = () => {
    const { signOut } = useAuth((_) => ({ signOut: _.signOut }))

    function out() {
        console.log("out start")
        // handlePush(`/`)
        console.log("out ///////")
        console.log("out requestAnimationFrame")
        signOut()
        console.log("out signOut")
    }

    return { out }
}
