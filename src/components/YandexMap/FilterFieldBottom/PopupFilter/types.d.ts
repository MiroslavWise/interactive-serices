import type { FC, Dispatch, SetStateAction } from "react"

interface IPopupFilter{
  visible: boolean

  setVisible: Dispatch<SetStateAction<boolean>>
}

export type TPopupFilter = FC<IPopupFilter>