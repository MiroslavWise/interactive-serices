import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseMessages } from "../types/useMessages"

import { arrayHash } from "@/lib/hashArray"

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
                const hash = arrayHash(
                    messages?.map((item) =>
                        JSON.stringify({
                            id: item.id,
                            message: item.message,
                        }),
                    ),
                )
                if (get().data?.[id]?.hash !== hash) {
                    set({
                        data: {
                            ...get().data,
                            [id]: {
                                ...get().data[id],
                                hash: hash!,
                                id: id,
                                messages: messages,
                            },
                        },
                    })
                }
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
