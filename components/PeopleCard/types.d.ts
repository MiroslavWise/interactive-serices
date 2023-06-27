import type { Dispatch, FC, SetStateAction } from "react";
import type { IStateVisible } from "modules/ModuleProfile/types";

interface IPeopleCard {
        photo: string
        name: string
        geo: string
        rate: string | number
        services: {
                value: string
                name: string
        }[]
        setDataProfile?: Dispatch<SetStateAction<IStateVisible>>
}

export type TPeopleCard = FC<IPeopleCard>