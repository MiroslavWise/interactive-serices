import { TAddCreate } from "@/store/types/useAddCreateModal"

export interface INewCreate {
    imageSrc: string
    label: string
    value: TAddCreate
}
export type TNewCreate = FC<INewCreate>
