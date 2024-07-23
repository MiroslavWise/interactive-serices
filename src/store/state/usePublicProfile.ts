import { create } from "zustand"

export const usePublicProfile = create<IStatePublicProfile>(() => ({
  visible: false,
  id: null,
}))

export const dispatchPublicProfile = (value: number | null) => {
  if (typeof value === "number") {
    usePublicProfile.setState(
      () => ({
        visible: true,
        id: value,
      }),
      true,
    )
  } else {
    usePublicProfile.setState(
      () => ({
        visible: false,
        id: null,
      }),
      true,
    )
  }
}

interface IStatePublicProfile {
  visible: boolean
  id: number | null
}
