import type { FC, Dispatch, SetStateAction } from "react"

interface IPopupFilter{
  visible: boolean

  setVisible: Dispatch<SetStateAction<boolean>>
}

export interface IButtonPagination{
  image: {
    src: string
    alt: string
  }
  className: string
}

export interface IListFilters{
  image:{
    src: string
    alt: string
  }
  label: string
  value: string
}

export type TPopupFilter = FC<IPopupFilter>