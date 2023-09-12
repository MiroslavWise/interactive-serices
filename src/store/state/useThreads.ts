import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseThread } from "../types/useThread"

import { threadsService } from "@/services/threads"

export const useThread = create(
    persist<IUseThread>(
        (set, get) => ({
            threads: [],
            total: undefined,

            getThreads(id) {
                threadsService.getUserQuery(id).then((response) => {
                    console.log(
                        "response threadsService getUserQuery: ",
                        response?.res,
                    )
                    if (response.ok) {
                        if (Array.isArray(response?.res)) {
                            set({
                                threads: response.res,
                            })
                        }
                        if (Number.isFinite(response?.meta?.total)) {
                            set({ total: response?.meta?.total })
                        }
                    }
                })
            },
            reset() {
                set({
                    threads: [],
                    total: undefined,
                })
            },
        }),
        {
            name: "thread",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
