import { useAuth } from "@/store/hooks"
import { useMemo } from "react"

export const useAddress = () => {
    const { addresses } = useAuth()

    const idsAddresses: number[] | null = useMemo(() => {
        if (!addresses) return null
        if (Array.isArray(addresses) && addresses.length === 0) return null
        const array = addresses.map((item) => item.id)
        return array
    }, [addresses])

    const coordinatesAddresses: number[][] | null = useMemo(() => {
        if (!addresses) return null
        if (Array.isArray(addresses) && addresses.length === 0) return null
        const array: number[][] = addresses.map((item) =>
            item.coordinates.split(" ").reverse().map(Number),
        )
        return array
    }, [addresses])

    const isAddresses: boolean =
        Array.isArray(addresses) && addresses?.length > 0

    return { idsAddresses, isAddresses, coordinatesAddresses }
}
