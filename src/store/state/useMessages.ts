import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseMessages } from "../types/useMessages"

import { arrayHash } from "@/lib/hashArray"
import { profileService } from "@/services/profile"

export const useMessages = create(
    persist<IUseMessages>(
        (set, get) => ({
            data: {},
            setPhotoAndName({ idThread, idUser }) {
                console.log("---setPhotoAndName---")
                if (idThread && idUser) {
                    if (!get().data?.[idThread!]?.idUser) {
                        profileService
                            .getProfileThroughUserId(idUser!)
                            .then((response) => {
                                console.log("---setPhotoAndName response---", response)
                                if (response.ok) {
                                    if (response.res) {
                                        const name = `${
                                            response?.res?.firstName! || ""
                                        } ${response?.res?.lastName! || ""}`
                                        const photo =
                                            response?.res?.image?.attributes
                                                ?.url!
                                        const created = response?.res?.created!
                                        set({
                                            data: {
                                                ...get().data,
                                                [idThread!]: {
                                                    ...get().data?.[idThread],
                                                    id: idThread,
                                                    photo: photo,
                                                    name: name,
                                                    idUser: idUser,
                                                    created: created,
                                                },
                                            },
                                        })
                                    }
                                }
                            })
                    }
                }
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
