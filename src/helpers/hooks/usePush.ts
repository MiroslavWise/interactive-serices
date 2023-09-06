import { useRouter } from "next/navigation"

import { useAnimateLoadPage } from "@/store/hooks"

export const usePush = () => {
    const { push } = useRouter()
    const { setIsAnimated } = useAnimateLoadPage()

    function handlePush(value: string) {
        setIsAnimated(true)
        push(value)
    }

    return {handlePush}
}
