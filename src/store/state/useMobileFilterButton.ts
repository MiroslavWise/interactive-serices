import { create } from "zustand"

export const useMobileFilterButton = create<{ visible: boolean }>((set, get) => ({
    visible: false,
}))

export const dispatchVisibleFilterMobileButton = (value: boolean) =>
    useMobileFilterButton.setState(() => ({
        visible: value,
    }))
