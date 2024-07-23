import { create } from "zustand"
import { dispatchModal, dispatchModalClose, EModalData } from "./useModal"

export const useCancelExchange = create<IState>(() => ({}))

export const dispatchOpenCancelExchange = ({ barterId, threadId }: { barterId: number | string; threadId?: string | number }) => {
  dispatchModal(EModalData.CancelExchange)
  useCancelExchange.setState(
    () => ({
      barterId: barterId,
      threadId: threadId,
    }),
    true,
  )
}

export const dispatchCloseCancelExchange = () => {
  dispatchModalClose()
  useCancelExchange.setState(
    () => ({
      barterId: undefined,
    }),
    true,
  )
}

interface IState {
  barterId?: number | string
  threadId?: number | string
}
