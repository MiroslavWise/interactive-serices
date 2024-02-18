import { create } from "zustand"

export const useChangePassword = create<{ visible: boolean }>(() => ({
  visible: false,
}))

export const dispatchChangePassword = (value: boolean) =>
  useChangePassword.setState(() => ({
    visible: value,
  }))
