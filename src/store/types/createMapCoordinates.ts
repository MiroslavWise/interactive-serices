import { Dispatch } from "react"

export interface IDispatchMapCoordinates {
  coordinates?: number[]
  zoom?: number
}

export interface IUseMapCoordinates {
  coordinates: number[] | undefined
  zoom: number

  dispatchMapCoordinates: Dispatch<IDispatchMapCoordinates>
}
