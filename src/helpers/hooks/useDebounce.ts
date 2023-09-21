import { debounce } from "@/lib/debounce"
import { useEffect, useInsertionEffect, useMemo, useState } from "react"

// export const useDebounce = (
//     value: any,
//     cb?: () => Promise<any>,
//     del?: number,
// ) => {
//     let delay = del ?? 1500
//     const [debouncedValue, setDebouncedValue] = useState<any>(null)

//     useInsertionEffect(() => {
//         const handler = setTimeout(() => {
//             if (cb) {
//                 cb().then((res) => setDebouncedValue(res))
//             }
//         }, delay)

//         return () => clearTimeout(handler)
//     }, [value])

//     return { debouncedValue }
// }

export function useDebounce<Fn extends (...args: any[]) => any>(
    fn: Fn,
    ms: number,
) {
    const memoizedFn = useEvent(fn)

    const debouncedFn = useMemo(
        () =>
            debounce((...args: Parameters<Fn>) => {
                memoizedFn(...args)
            }, ms),
        [ms, memoizedFn],
    )

    useEffect(
        () => () => {
            debouncedFn.cancel()
        },
        [debouncedFn],
    )

    return debouncedFn
}

import { useCallback, useLayoutEffect, useRef } from "react"

export function useEvent<T extends Function>(fn: T) {
    const fnRef = useRef(fn)

    useLayoutEffect(() => {
        fnRef.current = fn
    }, [fn])

    const eventCb = useCallback(
        (...args: unknown[]) => {
            return fnRef.current.apply(null, args)
        },
        [fnRef],
    )

    return eventCb as unknown as T
}
