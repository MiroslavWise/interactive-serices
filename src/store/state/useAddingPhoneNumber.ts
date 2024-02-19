import dayjs from "dayjs"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export const useAddingPhoneNumber = create<{ visible: boolean }>(() => ({ visible: false }))
export const useNumberConfirmation = create<{ visible: boolean; number?: string }>(() => ({ visible: false }))

export const dispatchAddingPhoneNumber = (value: boolean) => useAddingPhoneNumber.setState(() => ({ visible: value }))
export const dispatchNumberConfirmation = (visible: boolean, number?: string) =>
  useNumberConfirmation.setState(() => ({
    visible,
    number,
  }))

export const useTimerNumberConfirmation = create(
  persist<{ time?: string }>(() => ({}), { name: "timer-auth-create", storage: createJSONStorage(() => sessionStorage) }),
)

export const dispatchStartTimerNumberConfirmation = () =>
  useTimerNumberConfirmation.setState((_) => ({
    time: dayjs().format(),
  }))
