import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useNotificationCreateService = create(
  persist<IStateUseNotificationCreateService>(() => ({}), {
    name: "::count::notification::create::service::",
    storage: createJSONStorage(() => localStorage),
    version: 0.1,
  }),
)

export const dispatchAddCountNotificationCreateService = ({ userId, count }: IDispatchUseNotificationCreateService) =>
  useNotificationCreateService.setState((_) => ({
    ..._,
    [userId]: count,
  }))

interface IStateUseNotificationCreateService {
  [key: string | number]: number
}

interface IDispatchUseNotificationCreateService {
  userId: number
  count: number
}
