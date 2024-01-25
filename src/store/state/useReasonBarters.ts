import { create } from "zustand"

export const useReasonBarters = create<IStateReasonBarters>((set, get) => ({
    visible: false,
}))

export const dispatchReasonBarters = (values: IDispatchReasonBarters) =>
    useReasonBarters.setState((_) => ({
        ...values,
    }))

interface IStateReasonBarters {
    visible: boolean
    notificationId?: number
    barterId?: number
}
interface IDispatchReasonBarters extends IStateReasonBarters {}
