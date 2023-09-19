import type { Dispatch, DispatchWithoutAction } from "react"

export type TSteps = "start" | "end"

export interface IUseCreateDiscussion {
    text: string
    emotion: string | undefined
    stepDiscussion: TSteps

    setStepDiscussion: Dispatch<TSteps>
    setText: Dispatch<string>
    setEmotion: Dispatch<string>

    resetDiscussion: DispatchWithoutAction
}
