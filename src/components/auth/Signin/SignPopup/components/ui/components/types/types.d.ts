import type { Dispatch, DispatchWithoutAction, FC, SetStateAction } from "react"

export type TButtonSelection = FC<{
  active: boolean
  onClick: DispatchWithoutAction
  label: string
  image: string
}>

export type TCircleImageHeader = FC<{
  src: string
}>

export type TImageUploadComponent = FC<{
  selectedImage: string | null
  setSelectedImage: Dispatch<SetStateAction<string | null>>
  setFile: Dispatch<SetStateAction<File | null>>
}>