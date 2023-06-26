import type { FC } from "react";

interface IPeopleCard {
        photo: string
        name: string
        geo: string
        rate: string | number
        services: {
                value: string
                name: string
        }[]
}

export type TPeopleCard = FC<IPeopleCard>