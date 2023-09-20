import type { Dispatch, DispatchWithoutAction } from "react"

export type TSteps = "start" | "end"

export interface IUseCreateAlert {
    text: string
    emotion: string | undefined
    stepAlert: TSteps
    files: File[]
    selectedFile: string[]

    setFile: Dispatch<File>
    setSelectedFile: Dispatch<string>
    setStepAlert: Dispatch<TSteps>
    setText: Dispatch<string>
    setEmotion: Dispatch<string>

    resetAlert: DispatchWithoutAction
}
