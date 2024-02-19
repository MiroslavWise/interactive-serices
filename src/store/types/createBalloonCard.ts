import { EnumTypeProvider } from "@/types/enum"
import { Dispatch } from "react"

export interface IActionBalloonCard {
  visible?: boolean
  type?: EnumTypeProvider | null
  id?: number
  idUser?: number
}

export interface IUseBalloonCard {
  visible: boolean
  type: EnumTypeProvider | undefined
  id: number | undefined
  idUser: number | undefined

  dispatch: Dispatch<IActionBalloonCard>
}
