import type { FC } from "react"

export type TActiveCheck = "finished" | "in_process" | "not_active"

export interface ICircleCheck {
    type: TActiveCheck
}

export interface IAddingPhotos{

}

export type TCircleCheck = FC<ICircleCheck>
export type TAddingPhotos = FC<IAddingPhotos>
