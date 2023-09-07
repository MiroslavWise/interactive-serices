import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseMessages } from "../types/useMessages"

export const useMessages = create(
    persist<IUseMessages>(
        (set, get) => ({
            data: {},
            setPhotoAndName({ id, photo, name }) {
                set({
                    data: {
                        ...get().data,
                        [id]: {
                            ...get().data[id],
                            id: id,
                            photo: photo,
                            name: name,
                        },
                    },
                })
            },
            setMessages({ id, messages }) {
                set({
                    data: {
                        ...get().data,
                        [id]: {
                            ...get().data[id],
                            id: id,
                            messages: messages,
                        },
                    },
                })
            },
            resetMessages() {
                set({
                    data: {},
                })
            },
        }),
        {
            name: "messages",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
