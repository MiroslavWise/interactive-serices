import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseThread } from "../types/useThread"

import { threadsService } from "@/services/threads"

export const useThread = create(
    persist<IUseThread>(
        (set, get) => ({
            threads: [],
            total: undefined,
            search: "",

            setSearch(value) {
                set({ search: value })
            },
            getThreads(id) {
                let count = 4
                function request() {
                    threadsService.getUserQuery(id).then((response) => {
                        if (count > 0 && !response.ok) {
                            count = -1
                            setTimeout(() => {
                                request()
                            }, 2_000)
                        }
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
                }
                request()
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
