import type { FC } from "react"

interface IContainerAboutMe{
  text: string
}

interface IContainerTagAndButton{

}

export type TContainerAboutMe = FC<IContainerAboutMe>
export type TContainerTagAndButton = FC<IContainerTagAndButton>