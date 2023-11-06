import type { FC, Dispatch, SetStateAction } from "react"

export type TServices = "all" | "offer" | "request"

interface IServicesFC {
    type: TServices
    setTotal: Dispatch<SetStateAction<number>>
}

export type TServicesFC = FC<IServicesFC>
