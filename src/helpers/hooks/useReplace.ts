import { useRouter } from "next/navigation"

import { useAnimateLoadPage } from "@/store/hooks"

export const useReplace = () => {
    const { replace } = useRouter()
    const { setIsAnimated } = useAnimateLoadPage()

    function handleReplace(value: string) {
        setIsAnimated(true)
        replace(value)
    }

    return { handleReplace }
}
