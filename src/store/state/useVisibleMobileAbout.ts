import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { IUseVisibleMobileAbout } from "../types/createVisibleMobileAbout"

export const useVisibleMobileAbout = create(
    persist<IUseVisibleMobileAbout>(
        (set, get) => ({
            visible: true,
        }),
        {
            name: "mobile-about",
            storage: createJSONStorage(() => localStorage),
        },
    ),
)

export const dispatchVisibleMobileAbout = (value: boolean) =>
    useVisibleMobileAbout.setState(() => ({
        visible: value,
    }))
